import useAgent from "../useAgent";
import { getFeedInfo } from "../../../api/bsky/feed";
import { useQuery } from "@tanstack/react-query";

export const useFeedInfoKey = (feed: string) => ["feedInfo", feed];

export default function useFeedInfo(feed: string) {
  const agent = useAgent();

  const { data, isLoading, isFetching, isRefetching, error } = useQuery({
    queryKey: useFeedInfoKey(feed),
    queryFn: () => getFeedInfo(agent, feed),
  });

  return {
    feedInfo: data,
    isLoadingFeedInfo: isLoading,
    isFetchingFeedInfo: isFetching,
    isRefetchingFeedInfo: isRefetching,
    feedInfoError: error,
  };
}
