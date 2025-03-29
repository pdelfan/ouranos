import { useInfiniteQuery } from "@tanstack/react-query";
import { useAgent } from "@/app/providers/atproto";
import { getKnownFollowers } from "@/lib/atproto/bsky/social";
import { getProfile } from "@/lib/atproto/bsky/actor";

interface Props {
  handle: string;
}

export default function useKnownFollowers(props: Props) {
  const { handle } = props;
  const agent = useAgent();

  const {
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
      const profile = await getProfile({ agent, handleOrDid: handle });
      if (!profile)
        throw new Error("Could not get user did to show known followers list");
      return getKnownFollowers({
        agent,
        handleOrDid: profile.did,
        cursor: pageParam,        
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = knownFollowers?.pages.reduce(
    (acc, page) => acc + (page?.followers.length ?? 0),
    0
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
