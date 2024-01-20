import useAgent from "../useAgent";
import { getFeedInfo, getSavedFeeds } from "../../../api/bsky/feed";
import { useQuery } from "@tanstack/react-query";

export const useFeedInfoKey = (feed: string) => ["feedInfo", feed];

export default function useFeedInfo(feed: string) {
  const agent = useAgent();

  const { data, isLoading, isFetching, isRefetching, error } = useQuery({
    queryKey: useFeedInfoKey(feed),
    queryFn: async () => {
      const feedInfo = await getFeedInfo(agent, feed);
      const savedFeeds = await getSavedFeeds(agent);
      const isSaved = savedFeeds.some((savedFeed) => savedFeed.uri === feed);
      const isPinned = savedFeeds.some(
        (savedFeed) => savedFeed.uri === feed && savedFeed.pinned
      );
      return { ...feedInfo, isSaved, isPinned };
    },
  });

  return {
    feedInfo: data,
    isLoadingFeedInfo: isLoading,
    isFetchingFeedInfo: isFetching,
    isRefetchingFeedInfo: isRefetching,
    feedInfoError: error,
  };
}
