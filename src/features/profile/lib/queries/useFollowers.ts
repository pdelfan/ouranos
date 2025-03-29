import { useInfiniteQuery } from "@tanstack/react-query";
import { useAgent } from "@/app/providers/atproto";
import { getFollowers } from "@/lib/atproto/bsky/social";

interface Props {
  handleOrDid: string;
  limit?: number;
}

export default function useFollowers(props: Props) {
  const { handleOrDid, limit } = props;
  const agent = useAgent();

  const {
    data: followers,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["followers", handleOrDid],
    queryFn: async ({ pageParam }) => {
      return getFollowers({
        agent,
        handleOrDid: handleOrDid,
        cursor: pageParam,
        limit: limit,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = followers?.pages.reduce(
    (acc, page) => acc + (page?.followers.length ?? 0),
    0
  );

  const isEmpty = !isFetching && !isFetchingNextPage && dataLength === 0;

  return {
    followers,
    isFollowersEmpty: isEmpty,
    followersError: error,
    isLoadingFollowers: isLoading,
    isFetchingFollowers: isFetching,
    isFetchingFollowersNextPage: isFetchingNextPage,
    hasFollowersNextPage: hasNextPage,
    fetchFollowersNextPage: fetchNextPage,
  };
}
