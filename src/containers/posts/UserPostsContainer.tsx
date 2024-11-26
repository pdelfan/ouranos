"use client";

import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { getProfile } from "@/lib/api/bsky/actor";
import useProfilePosts from "@/lib/hooks/bsky/feed/useProfilePosts";
import { useQuery } from "@tanstack/react-query";
import PostContainer from "./PostContainer";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import ComposeButton from "@/components/actions/composeButton/ComposeButton";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAgent } from "@/app/providers/agent";

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
    queryFn: async () => {
      return getProfile(handle, agent);
    },
  });
  const isBlocked = profile?.viewer?.blocking ? true : false;
  const hasBlockedYou = profile?.viewer?.blockedBy ? true : false;

  const {
    userPostsStatus,
    userPostsData,
    userPostsError,
    isLoadingUserPosts,
    isFetchingUserPosts,
    fetchNextUserPostsPage,
    isFetchingUserPostsNextPage,
    userPostsHasNextPage,
  } = useProfilePosts({ mode: mode, handle: handle });

  const dataLength = userPostsData?.pages.reduce(
    (acc, page) => acc + (page?.data.feed.length ?? 0),
    0,
  );

  const isEmpty =
    !isFetchingUserPosts && !isFetchingUserPostsNextPage && dataLength === 0;

  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;

  return (
    <div>
      <ComposeButton float={true} />
      <InfiniteScroll
        dataLength={dataLength ?? 0}
        next={fetchNextUserPostsPage}
        hasMore={userPostsHasNextPage}
        loader={<LoadingSpinner />}
        scrollThreshold={0.8}
        className="no-scrollbar"
      >
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
      </InfiniteScroll>

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
    </div>
  );
}
