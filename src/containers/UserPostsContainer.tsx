"use client";

import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { getProfile } from "@/lib/api/bsky/actor";
import useAgent from "@/lib/hooks/bsky/useAgent";
import useProfilePosts from "@/lib/hooks/bsky/feed/useProfilePosts";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import PostContainer from "./PostContainer";

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

  return (
    <div>
      {!isBlocked &&
        userPostsData &&
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
                  />
                ))}
            {mode !== "posts" &&
              page.data.feed.map((post, i) => (
                <PostContainer
                  key={post.post.uri + i}
                  post={post}
                  isReply={!!post.reply}
                />
              ))}
          </div>
        ))}
      {!isBlocked && isFetchingUserPosts && !isFetchingUserPostsNextPage && (
        <FeedPostSkeleton />
      )}
      {isFetchingUserPostsNextPage && (
        <section className="flex flex-1 justify-center mt-3">
          <Icon icon="eos-icons:loading" className="text-xl" />
        </section>
      )}
      {!isBlocked && userPostsError && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      {isBlocked && (
        <FeedAlert
          variant="empty"
          message={`Unblock @${handle} to view their posts`}
        />
      )}
      {isEmpty && <FeedAlert variant="empty" message="This feed is empty" />}
      {!userPostsError &&
        !isFetchingUserPosts &&
        !isFetchingUserPostsNextPage && <EndOfFeed />}
      <div ref={observerRef}></div>
    </div>
  );
}
