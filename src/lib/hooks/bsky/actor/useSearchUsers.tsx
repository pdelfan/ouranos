import { useQueryClient } from "@tanstack/react-query";
import useAgent from "../useAgent";
import { searchProfilesTypehead } from "@/lib/api/bsky/actor";
import { getFollows } from "@/lib/api/bsky/social";

interface Props {
  authorHandle?: string;
}

export default function useSearchUsers(props: Props) {
  const { authorHandle } = props;
  const agent = useAgent();
  const queryClient = useQueryClient();

  return async (term: string) => {
    // search is empty
    // show recent follows instead of no result
    if (!term && authorHandle) {
      try {
        const data = await queryClient.fetchQuery({
          staleTime: 300 * 1000, // 5 minutes
          queryKey: ["followers"],
          queryFn: () => getFollows({ handle: authorHandle, agent, limit: 5 }),
        });
        return data.data.follows;
      } catch (error) {
        throw new Error("Could not get followings");
      }
    }

    try {
      const data = await queryClient.fetchQuery({
        staleTime: 60 * 1000, // 1 minute
        queryKey: ["search", term],
        queryFn: () => searchProfilesTypehead(agent, term),
      });
      return data?.actors;
    } catch (error) {
      throw new Error("Could not search users");
    }
  };
}
