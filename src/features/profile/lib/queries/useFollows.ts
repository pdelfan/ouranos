import { useInfiniteQuery } from "@tanstack/react-query";
import { useAgent } from "@/app/providers/atproto";
import { getFollows } from "@/lib/atproto/bsky/social";

interface Props {
  handleOrDid: string;
  limit?: number;
}

export default function useFollows(props: Props) {
  const { handleOrDid, limit } = props;
  const agent = useAgent();

  const {
    data: follows,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["follows", handleOrDid],
    queryFn: async ({ pageParam }) => {
      return getFollows({
        agent,
        handleOrDid: handleOrDid,
        cursor: pageParam,
        limit: limit,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = follows?.pages.reduce(
    (acc, page) => acc + (page?.follows.length ?? 0),
    0
  );

  const isEmpty = !isFetching && !isFetchingNextPage && dataLength === 0;

  return {
    follows,
    isFollowsEmpty: isEmpty,
    followsError: error,
    isLoadingFollows: isLoading,
    isFetchingFollows: isFetching,
    isFetchingFollowsNextPage: isFetchingNextPage,
    hasFollowsNextPage: hasNextPage,
    fetchFollowsNextPage: fetchNextPage,
  };
}
