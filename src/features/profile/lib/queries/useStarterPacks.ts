import { useInfiniteQuery } from "@tanstack/react-query";
import { useAgent } from "@/app/providers/atproto";
import { getStartPacks } from "@/lib/atproto/bsky/graph";

interface Props {
  handleOrDid: string;
  limit?: number;
}

export default function useStarterPacks(props: Props) {
  const { handleOrDid, limit } = props;
  const agent = useAgent();

  const {
    data: starterPacks,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["starter packs", handleOrDid],
    queryFn: async ({ pageParam }) => {
      return getStartPacks({
        agent,
        handleOrDid: handleOrDid,
        cursor: pageParam,
        limit: limit,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = starterPacks?.pages.reduce(
    (acc, page) => acc + (page?.starterPacks.length ?? 0),
    0
  );

  const isEmpty = !isFetching && !isFetchingNextPage && dataLength === 0;

  return {
    starterPacks,
    isStarterPacksEmpty: isEmpty,
    starterPacksError: error,
    isLoadingStarterPacks: isLoading,
    isFetchingStarterPacks: isFetching,
    isFetchingStarterPacksNextPage: isFetchingNextPage,
    hasStarterPacksNextPage: hasNextPage,
    fetchStarterPacksNextPage: fetchNextPage,
  };
}
