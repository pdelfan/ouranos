"use client";

import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import useFeed from "@/lib/hooks/useFeed";
import { Icon } from "@iconify/react/dist/iconify.js";

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

  return (
    <div>
      {feedData &&
        feedData?.pages.map((page, i) => (
          <div key={i}>
            {page.data.feed.map((post, i) => (
              <FeedPost key={post.post.uri + i} post={post} />
            ))}
          </div>
        ))}
      {isFetchingFeed && !isFetchingFeedNextPage && <FeedPostSkeleton />}
      {isFetchingFeedNextPage && (
        <section className="flex flex-1 justify-center mt-3">
          <Icon icon="eos-icons:loading" className="text-xl" />
        </section>
      )}
      {!isFetchingFeed && !feedHasNextPage && <EndOfFeed />}
      <div ref={observerRef}></div>
    </div>
  );
}
