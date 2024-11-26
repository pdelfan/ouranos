import { useInfiniteQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/bsky/actor";
import { getKnownFollowers } from "@/lib/api/bsky/social";
import { useAgent } from "@/app/providers/agent";

interface Props {
  handle: string;
}

export default function useKnownFollowers(props: Props) {
  const { handle } = props;
  const agent = useAgent();

  const {
    status,
    data: knownFollowers,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["known followers", handle],
    queryFn: async ({ pageParam }) => {
      const profile = await getProfile(handle, agent);
      if (!profile) throw new Error("Could not get user id to show lists");
      return getKnownFollowers(agent, profile.did, pageParam);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = knownFollowers?.pages.reduce(
    (acc, page) => acc + (page?.followers.length ?? 0),
    0,
  );

  const isEmpty = !isFetching && !isFetchingNextPage && dataLength === 0;

  return {
    knownFollowers,
    isKnownFollowersEmpty: isEmpty,
    knownFollowersError: error,
    isLoadingKnownFollowers: isLoading,
    isFetchingKnownFollowers: isFetching,
    isFetchingKnownFollowersNextPage: isFetchingNextPage,
    hasKnownFollowersNextPage: hasNextPage,
    fetchKnownFollowersNextPage: fetchNextPage,
  };
}
