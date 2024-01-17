import useAgent from "../useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed, getTimeline } from "../../../api/bsky/feed";

export const useFeedKey = (feed: string) => [feed];

export default function useFeed(feed: string) {
  const agent = useAgent();
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

  return {
    refetchFeed: refetch,
    feedStatus: status,
    feedData: timeline,
    feedError: error,
    isLoadingFeed: isLoading,
    isRefetchingFeed: isRefetching,
    isFetchingFeed: isFetching,
    isFetchingFeedNextPage: isFetchingNextPage,
    feedHasNextPage: hasNextPage,
    fetchNextFeedPage: fetchNextPage,
  };
}
