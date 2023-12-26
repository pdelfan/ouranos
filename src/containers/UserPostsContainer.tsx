"use client";

import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { getProfile } from "@/lib/api/bsky/actor";
import useAgent from "@/lib/hooks/bsky/useAgent";
import useProfilePosts from "@/lib/hooks/bsky/feed/useProfilePosts";
import { useQuery } from "@tanstack/react-query";
import PostContainer from "./PostContainer";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import { getContentFilter } from "@/lib/utils/feed";
import ComposeButton from "@/components/actions/composeButton/ComposeButton";
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
    observerRef,
    userPostsStatus,
    userPostsData,
    userPostsError,
    isLoadingUserPosts,
    isFetchingUserPosts,
    isFetchingUserPostsNextPage,
    userPostsHasNextPage,
  } = useProfilePosts({ mode: mode, handle: handle });

  const isEmpty =
    !isFetchingUserPosts &&
    !isFetchingUserPostsNextPage &&
    userPostsData?.pages[0]?.data?.feed?.length === 0;

  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;

  return (
    <div>
      <ComposeButton mode="float" />
      {!isBlocked &&
        !hasBlockedYou &&
        userPostsData &&
        contentFilter &&
        userPostsData?.pages.map((page, i) => (
          <div key={i}>
            {mode === "posts" &&
              page.data.feed
                .filter((post) => !post.reply)
                .map((post, i) => (
                  <PostContainer
                    key={post.post.uri + i}
                    post={post}
                    isReply={!!post.reply}
                    filter={contentFilter}
                  />
                ))}
            {mode !== "posts" &&
              page.data.feed.map((post, i) => (
                <PostContainer
                  key={post.post.uri + i}
                  post={post}
                  isReply={!!post.reply}
                  filter={contentFilter}
                />
              ))}
          </div>
        ))}
      {!isBlocked &&
        !hasBlockedYou &&
        isFetchingUserPosts &&
        !isFetchingUserPostsNextPage && <FeedPostSkeleton />}
      {!isBlocked && isFetchingUserPostsNextPage && (
        <section className="flex flex-1 justify-center mt-3">
          <AiOutlineLoading3Quarters className="text-xl" />
        </section>
      )}
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
      <div ref={observerRef} />
    </div>
  );
}
