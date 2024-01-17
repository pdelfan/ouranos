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
import useVirtualList from "@/lib/hooks/useVirtualList";
import useInfiniteList from "@/lib/hooks/useInfiniteList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  feed: string;
}

export default function FeedContainer(props: Props) {
  const { feed } = props;
  const {
    refetchFeed,
    feedStatus,
    feedData,
    feedError,
    isLoadingFeed,
    isFetchingFeed,
    isFetchingFeedNextPage,
    feedHasNextPage,
    fetchNextFeedPage,
  } = useFeed(feed);

  const isEmpty =
    !isFetchingFeed &&
    !isFetchingFeedNextPage &&
    feedData?.pages[0]?.data?.feed?.length === 0;

  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;
  const feedFilter = preferences?.feedFilter;

  const allPosts =
    feedData && feedFilter
      ? feedData.pages
          .flatMap((page) =>
            page?.data.feed.filter((f) =>
              feed === "timeline" ? filterFeed(f, feedFilter) : true
            )
          )
          .map((post) => post)
      : [];

  const { virtualizer, viewportRef, virtualMap, getVirtualItems } =
    useVirtualList({
      items: allPosts,
      options: {
        size: 250,
        overscan: 5,
        hasNextPage: feedHasNextPage,
      },
    });

  useInfiniteList({
    items: allPosts,
    fetchNextPage: fetchNextFeedPage,
    getVirtualItems: getVirtualItems,
    hasNextPage: feedHasNextPage,
    isFetchingNextPage: isFetchingFeedNextPage,
  });

  return (
    <section>
      <Refetch
        onRefetch={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          refetchFeed();
        }}
      />
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
          {feedData &&
            contentFilter &&
            feedFilter &&
            virtualMap((item) => (
              <article
                key={item.key}
                data-index={item.index}
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  transform: `translateY(${
                    item.start - virtualizer.options.scrollMargin
                  }px)`,
                  width: "100%",
                }}
                className="p-3 border border-x-0 md:border-x first:border-t-0 last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0"
              >
                {allPosts[item.index] && (
                  <PostContainer
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
      {isFetchingFeed && !isFetchingFeedNextPage && <FeedPostSkeleton />}
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
    </section>
  );
}
