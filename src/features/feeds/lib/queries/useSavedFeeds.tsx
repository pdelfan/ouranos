import { useAgent } from "@/app/providers/atproto";
import { getSavedFeeds } from "@/lib/atproto/bsky/feed";
import { useQuery } from "@tanstack/react-query";

export default function useSavedFeeds() {
  const agent = useAgent();

  const {
    data: savedFeeds,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["savedFeeds"],
    queryFn: async () => {
      const savedFeeds = await getSavedFeeds({agent});
      if (!savedFeeds) {
        throw new Error("Could not get saved feeds");
      }
      return savedFeeds;
    },
  });

  return { savedFeeds, error, isLoading, isFetching };

}
