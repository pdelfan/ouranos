import { useQuery } from "@tanstack/react-query";
import { getListInfo } from "@/lib/api/bsky/list";
import { getAgentFromClient } from "@/lib/api/bsky/agent";

export const listInfoKey = (list: string) => ["listInfo", list];

export default function useFeedInfo(list: string) {
  const { data, isLoading, isFetching, isRefetching, error } = useQuery({
    queryKey: listInfoKey(list),
    queryFn: async () => {
      const agent = await getAgentFromClient();
      return getListInfo(list, agent);
    },
  });

  return {
    listInfo: data,
    isLoadingListInfo: isLoading,
    isFetchingListInfo: isFetching,
    isRefetchingListInfo: isRefetching,
    listInfoError: error,
  };
}
