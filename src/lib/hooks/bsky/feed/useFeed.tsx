import { useInView } from "react-intersection-observer";
import useAgent from "../useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getFeed, getTimeline } from "../../../api/bsky/feed";

export const useFeedKey = (feed: string) => [feed];

export default function useFeed(feed: string) {
  const agent = useAgent();
  const { ref, inView } = useInView({ rootMargin: "800px" });
  const {
    status,
    data: timeline,
    refetch,
    error,
    isLoading,
    isRefetching,
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
    isRefetchingFeed: isRefetching,
    isFetchingFeed: isFetching,
    isFetchingFeedNextPage: isFetchingNextPage,
    feedHasNextPage: hasNextPage,
  };
}
