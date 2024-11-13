import { getAgentFromClient } from "@/lib/api/bsky/agent";
import {
  getUserPosts,
  getUserReplyPosts,
  getUserMediaPosts,
  getUserLikes,
} from "../../../api/bsky/feed";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Props {
  mode: UserPostMode;
  handle: string;
}

export const useProfilePostsKey = (handle?: string, mode?: UserPostMode) => [
  "profilePosts",
  (handle || "handle") + (mode || "mode"),
];

export default function useProfilePosts(props: Props) {
  const { mode, handle } = props;
  const actor = handle;

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
    queryKey: useProfilePostsKey(handle, mode),
    queryFn: async ({ pageParam }) => {
      const agent = await getAgentFromClient();
      return chooseFetchFunction(mode)(agent, actor, pageParam);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.data.cursor,
    refetchOnWindowFocus: true,
  });

  return {
    userPostsStatus: status,
    userPostsData: userPosts,
    userPostsError: error,
    isLoadingUserPosts: isLoading,
    isFetchingUserPosts: isFetching,
    fetchNextUserPostsPage: fetchNextPage,
    isFetchingUserPostsNextPage: isFetchingNextPage,
    userPostsHasNextPage: hasNextPage,
  };
}
