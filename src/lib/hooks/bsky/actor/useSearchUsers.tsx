import { useQueryClient } from "@tanstack/react-query";
import useAgent from "../useAgent";
import { searchProfilesTypehead } from "@/lib/api/bsky/actor";

export default function useSearchUsers() {
  const agent = useAgent();
  const queryClient = useQueryClient();

  return async (term: string) => {
    if (!term) return;
    try {
      const data = await queryClient.fetchQuery({
        staleTime: 60 * 1000, // 1 minute
        queryKey: ["search", term],
        queryFn: () => searchProfilesTypehead(agent, term),
      });
      return data?.actors;
    } catch (error) {
      console.error(error);
    }
  };
}
