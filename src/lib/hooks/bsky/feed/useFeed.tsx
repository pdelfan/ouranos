import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed, getTimeline } from "../../../api/bsky/feed";
import { getListFeed } from "@/lib/api/bsky/list";
import { useAgent } from "@/app/providers/agent";

export const useFeedKey = (feed: string) => [feed];

interface Props {
  feed: string;
  mode: "feed" | "list";
}

export default function useFeed(props: Props) {
  const { feed, mode } = props;
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
    queryFn: async ({ pageParam }) => {
      if (mode === "feed") {
        if (feed === "timeline") {
          return getTimeline(agent, pageParam);
        } else {
          return getFeed(agent, feed, pageParam);
        }
      }

      if (mode === "list") {
        return getListFeed(agent, feed, pageParam);
      }
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.data.cursor,
  });

  return {
    refetchFeed: refetch,
    feedStatus: status,
    feedData: timeline,
    feedError: error,
    isLoadingFeed: isLoading,
    isRefetchingFeed: isRefetching,
    isFetchingFeed: isFetching,
    fetchNextFeedPage: fetchNextPage,
    isFetchingFeedNextPage: isFetchingNextPage,
    feedHasNextPage: hasNextPage,
  };
}
