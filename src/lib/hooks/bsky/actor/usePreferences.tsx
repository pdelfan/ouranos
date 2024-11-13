import { useQuery } from "@tanstack/react-query";
import { getPreferences } from "@/lib/api/bsky/actor";
import getThreadPreferences, {
  getContentFilter,
  getFeedFilter,
} from "@/lib/utils/feed";
import { getAgentFromClient } from "@/lib/api/bsky/agent";

export default function usePreferences() {
  const {
    status: statusPreferences,
    data: preferences,
    error: errorPreferences,
    isLoading: isLoadingPreferences,
    isFetching: isFetchingPreferences,
  } = useQuery({
    queryKey: ["preferences"],
    queryFn: async () => {
      const agent = await getAgentFromClient();
      const preferences = await getPreferences(agent);
      const feedFilter = getFeedFilter(preferences);
      const contentFilter = getContentFilter(preferences);
      const threadPreferences = getThreadPreferences(preferences);
      return {
        feedFilter,
        contentFilter,
        threadPreferences,
      };
    },
  });

  return {
    statusPreferences,
    preferences,
    errorPreferences,
    isLoadingPreferences,
    isFetchingPreferences,
  };
}
