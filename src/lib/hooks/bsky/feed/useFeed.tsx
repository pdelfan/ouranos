import { useInView } from "react-intersection-observer";
import useAgent from "../useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getFeed, getTimeline } from "../../../api/bsky/feed";
import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export const useFeedKey = (feed: string) => [feed];

export default function useFeed(feed: string) {
  const agent = useAgent();
  const { ref, inView } = useInView();
  const {
    status,
    data: timeline,
    refetch,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: useFeedKey(feed),
    queryFn: ({ pageParam }) =>
      feed === "timeline"
        ? getTimeline(agent, pageParam)
        : getFeed(agent, feed, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.data.cursor,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return {
    observerRef: ref,
    refetchFeed: refetch,
    feedStatus: status,
    feedData: timeline,
    feedError: error,
    isLoadingFeed: isLoading,
    isFetchingFeed: isFetching,
    isFetchingFeedNextPage: isFetchingNextPage,
    feedHasNextPage: hasNextPage,
  };
}
