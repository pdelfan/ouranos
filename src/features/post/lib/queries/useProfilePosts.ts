import { useInfiniteQuery } from "@tanstack/react-query";
import { useAgent } from "@/app/providers/atproto";
import {
  getUserLikes,
  getUserMediaPosts,
  getUserPosts,
  getUserReplyPosts,
} from "@/lib/atproto/bsky/feed";
import { UserPostMode } from "@/types";

interface Props {
  mode: UserPostMode;
  handle: string;
  limit?: number;
}

export default function useProfilePosts(props: Props) {
  const agent = useAgent();

  const chooseFetchFunction = (mode: string) => {
    switch (mode) {
      case "posts":
        return getUserPosts;
      case "reposts":
        return getUserReplyPosts;
      case "media":
        return getUserMediaPosts;
      case "likes":
        return getUserLikes;
      default:
        throw new Error("Invalid mode");
    }
  };

  const {
    status,
    data: userPosts,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [props.handle, props.mode],
    queryFn: async ({ pageParam }) => {
      return chooseFetchFunction(props.mode)({
        agent: agent,
        cursor: pageParam,
        handleOrDid: props.handle,
        limit: props.limit,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.cursor,
    refetchOnWindowFocus: true,
  });

  const dataLength = userPosts?.pages.reduce(
    (acc, page) => acc + (page?.feed.length ?? 0),
    0
  );

  const isEmpty = !isFetching && !isFetchingNextPage && dataLength === 0;

  return {
    userPostsStatus: status,
    userPostsData: userPosts,
    userPostsError: error,
    isUserPostsEmpty: isEmpty,
    isLoadingUserPosts: isLoading,
    isFetchingUserPosts: isFetching,
    fetchNextUserPostsPage: fetchNextPage,
    isFetchingUserPostsNextPage: isFetchingNextPage,
    userPostsHasNextPage: hasNextPage,
  };
}
