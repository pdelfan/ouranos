"use client";

import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import useFeed from "@/lib/hooks/bsky/feed/useFeed";
import PostContainer from "./PostContainer";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import { filterFeed } from "@/lib/utils/feed";
import Refetch from "@/components/actions/refetch/Refetch";
import ComposeButton from "@/components/actions/composeButton/ComposeButton";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";

interface Props {
  feed: string;
  mode: "feed" | "list";
}

export default function FeedContainer(props: Props) {
  const { feed, mode } = props;
  const {
    observerRef,
    refetchFeed,
    feedStatus,
    feedData,
    feedError,
    isLoadingFeed,
    isFetchingFeed,
    isFetchingFeedNextPage,
    feedHasNextPage,
  } = useFeed({
    feed: feed,
    mode: mode,
  });

  const isEmpty =
    !isFetchingFeed &&
    !isFetchingFeedNextPage &&
    feedData?.pages[0]?.data?.feed?.length === 0;

  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;
  const feedFilter = preferences?.feedFilter;

  return (
    <section>
      <Refetch
        onRefetch={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          refetchFeed();
        }}
      />
      <ComposeButton mode="float" />
      {isFetchingFeed && !isFetchingFeedNextPage && <FeedPostSkeleton />}
      {feedData &&
        contentFilter &&
        feedFilter &&
        feedData.pages.map((page, i) => (
          <div key={i}>
            {page?.data.feed
              .filter((f) =>
                feed === "timeline" ? filterFeed(f, feedFilter) : true,
              )
              .map((post, j) => (
                <PostContainer
                  key={post.post.uri + j}
                  post={post}
                  isReply={post.reply ? true : false}
                  filter={contentFilter}
                />
              ))}
          </div>
        ))}
      {isFetchingFeedNextPage && <LoadingSpinner />}
      {feedError && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      {isEmpty && !feedHasNextPage && (
        <FeedAlert variant="empty" message="This feed is empty" />
      )}
      {!isEmpty &&
        !feedError &&
        !isFetchingFeed &&
        !feedHasNextPage &&
        !isFetchingFeedNextPage && <EndOfFeed />}
      <div ref={observerRef} />
    </section>
  );
}
