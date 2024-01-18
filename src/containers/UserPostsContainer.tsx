"use client";

import FeedPostSkeleton, {
  Skeleton,
} from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { getProfile } from "@/lib/api/bsky/actor";
import useAgent from "@/lib/hooks/bsky/useAgent";
import useProfilePosts from "@/lib/hooks/bsky/feed/useProfilePosts";
import { useQuery } from "@tanstack/react-query";
import PostContainer from "./PostContainer";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import ComposeButton from "@/components/actions/composeButton/ComposeButton";
import useVirtualList from "@/lib/hooks/useVirtualList";
import useInfiniteList from "@/lib/hooks/useInfiniteList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  mode: UserPostMode;
  handle: string;
}

export default function UserPostsConatiner(props: Props) {
  const { mode, handle } = props;
  const agent = useAgent();
  const {
    data: profile,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["profile", handle],
    queryFn: () => getProfile(handle, agent),
  });
  const isBlocked = profile?.viewer?.blocking ? true : false;
  const hasBlockedYou = profile?.viewer?.blockedBy ? true : false;

  const {
    userPostsStatus,
    userPostsData,
    userPostsError,
    isLoadingUserPosts,
    isFetchingUserPosts,
    isFetchingUserPostsNextPage,
    userPostsHasNextPage,
    fetchNextUserPostsPage,
  } = useProfilePosts({ mode: mode, handle: handle });

  const isEmpty =
    !isFetchingUserPosts &&
    !isFetchingUserPostsNextPage &&
    userPostsData?.pages[0]?.data?.feed?.length === 0;

  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;

  const allPosts = userPostsData
    ? mode === "posts"
      ? userPostsData.pages.flatMap((page) =>
          page?.data.feed.filter((post) => !post.reply)
        )
      : userPostsData.pages.flatMap((page) => page?.data.feed)
    : [];

  const { virtualizer, viewportRef, virtualMap, getVirtualItems } =
    useVirtualList({
      items: allPosts,
      options: {
        size: 100,
        overscan: 2,
        scrollMargin: 500,
        hasNextPage: userPostsHasNextPage,
      },
    });

  useInfiniteList({
    items: allPosts,
    fetchNextPage: fetchNextUserPostsPage,
    getVirtualItems: getVirtualItems,
    hasNextPage: userPostsHasNextPage,
    isFetchingNextPage: isFetchingUserPostsNextPage,
  });

  return (
    <section>
      <ComposeButton mode="float" />

      <section
        ref={viewportRef}
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        <section className="flex flex-col">
          {!isBlocked &&
            !hasBlockedYou &&
            userPostsData &&
            contentFilter &&
            virtualMap((item, i) => (
              <article
                key={item.key}
                data-index={item.index}
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  transform: `translateY(${
                    item.start - virtualizer.options.scrollMargin
                  }px)`,
                }}
                className="w-full flex flex-col justify-between p-3 border border-x-0 md:border-x first:border-t-0 last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0"
              >
                {allPosts[item.index] && (
                  <PostContainer
                    key={allPosts[item.index].post.uri}
                    post={allPosts[item.index]}
                    isReply={!!allPosts[item.index].reply}
                    filter={contentFilter}
                  />
                )}

                {item.index > allPosts.length - 1 && (
                  <section className="flex flex-1 justify-center">
                    <AiOutlineLoading3Quarters className="text-xl" />
                  </section>
                )}
              </article>
            ))}
        </section>
      </section>

      {!isBlocked &&
        !hasBlockedYou &&
        userPostsData &&
        contentFilter &&
        virtualMap((post, i) => <></>)}
      {!isBlocked &&
        !hasBlockedYou &&
        isFetchingUserPosts &&
        !isFetchingUserPostsNextPage && <FeedPostSkeleton />}
      {!isBlocked && !hasBlockedYou && userPostsError && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      {isBlocked && (
        <FeedAlert
          variant="empty"
          message={`Unblock @${handle} to view their posts`}
        />
      )}
      {hasBlockedYou && (
        <FeedAlert
          variant="empty"
          message={`@${handle}'s activity is not available`}
        />
      )}
      {isEmpty && !userPostsHasNextPage && (
        <FeedAlert variant="empty" message="There are no posts... yet" />
      )}
      {!isEmpty &&
        !userPostsError &&
        !isFetchingUserPosts &&
        !userPostsHasNextPage &&
        !isFetchingUserPostsNextPage && <EndOfFeed />}
    </section>
  );
}
