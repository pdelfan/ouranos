"use client";

import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import useFeed from "@/lib/hooks/bsky/feed/useFeed";
import { Icon } from "@iconify/react/dist/iconify.js";
import PostContainer from "./PostContainer";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import useContentFilter from "@/lib/hooks/bsky/actor/useContentFilter";
import useFeedFilter from "@/lib/hooks/bsky/actor/useFeedFilter";
import { filterFeed } from "@/lib/utils/feed";

interface Props {
  feed: string;
}

export default function FeedContainer(props: Props) {
  const { feed } = props;
  const {
    observerRef,
    feedStatus,
    feedData,
    feedError,
    isLoadingFeed,
    isFetchingFeed,
    isFetchingFeedNextPage,
    feedHasNextPage,
  } = useFeed(feed);
  const isEmpty =
    !isFetchingFeed &&
    !isFetchingFeedNextPage &&
    feedData?.pages[0]?.data?.feed?.length === 0;

  const { preferences } = usePreferences();
  const contentFilter = useContentFilter(preferences);
  const feedFilter = useFeedFilter(preferences);

  return (
    <div>
      {feedData &&
        feedFilter &&
        feedData?.pages.map((page, i) => (
          <div key={i}>
            {page.data.feed
              .filter((f) =>
                feed === "timeline" ? filterFeed(f, feedFilter) : true
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
      {isFetchingFeed && !isFetchingFeedNextPage && <FeedPostSkeleton />}
      {isFetchingFeedNextPage && (
        <section className="flex flex-1 justify-center mt-3">
          <Icon icon="eos-icons:loading" className="text-xl" />
        </section>
      )}
      {feedError && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      {isEmpty && <FeedAlert variant="empty" message="This feed is empty" />}
      {!isEmpty && !feedError && !isFetchingFeed && !feedHasNextPage && !isFetchingFeedNextPage && (
        <EndOfFeed />
      )}
      <div ref={observerRef}></div>
    </div>
  );
}
