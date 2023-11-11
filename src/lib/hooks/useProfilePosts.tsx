import { useEffect } from "react";
import {
  getUserPosts,
  getUserReplyPosts,
  getUserMediaPosts,
  getUserLikes,
} from "../api/bsky/feed";
import useAgent from "./useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

interface Props {
  mode: UserPostMode;
  handle: string;
}

export default function useProfilePosts(props: Props) {
  const { mode, handle } = props;
  const agent = useAgent();
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

  const { ref, inView } = useInView();
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
    queryKey: [mode + handle],
    queryFn: ({ pageParam }) =>
      chooseFetchFunction(mode)(agent, actor, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.data.cursor,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return {
    observerRef: ref,
    userPostsStatus: status,
    userPostsData: userPosts,
    userPostsError: error,
    isLoadingUserPosts: isLoading,
    isFetchingUserPosts: isFetching,
    isFetchingUserPostsNextPage: isFetchingNextPage,
    userPostsHasNextPage: hasNextPage,
  };
}
