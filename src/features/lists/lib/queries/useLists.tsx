import { useAgent, useSession } from "@/app/providers/atproto";
import { getLists } from "@/lib/atproto/bsky/list";
import { useQuery } from "@tanstack/react-query";

export default function useLists() {
  const agent = useAgent();
  const session = useSession();

  const {
    data: lists,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const lists = await getLists({agent, limit: 15, did: session.did});
      if (!lists) {
        throw new Error("Could not get lists");
      }
      return lists;
    },
  });

  return { lists, error, isLoading, isFetching };

}
