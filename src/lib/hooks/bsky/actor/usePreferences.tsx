import { useQuery } from "@tanstack/react-query";
import useAgent from "../useAgent";
import { getPreferences } from "@/lib/api/bsky/actor";

export default function usePreferences() {
  const agent = useAgent();

  const {
    status: statusPreferences,
    data: preferences,
    error: errorPreferences,
    isLoading: isLoadingPreferences,
    isFetching: isFetchingPreferences,
  } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => getPreferences(agent),
  });

  return {
    statusPreferences,
    preferences,
    errorPreferences,
    isLoadingPreferences,
    isFetchingPreferences,
  };
}
