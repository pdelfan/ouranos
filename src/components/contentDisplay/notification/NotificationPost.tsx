"use client";

import FeedPost from "../feedPost/FeedPost";
import { getPost } from "@/lib/api/bsky/feed";
import { AppBskyFeedDefs } from "@atproto/api";
import { ContentFilterResult } from "../../../../types/feed";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useQuery } from "@tanstack/react-query";
import NotificationPostSkeleton from "./NotificationPostSkeleton";

interface Props {
  uri: string;
  filter: ContentFilterResult;
}

export default function NotificationPost(props: Props) {
  const { uri, filter } = props;
  const agent = useAgent();

  const {
    status,
    data: post,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["notificationPost", uri],
    queryFn: () => getPost(agent, uri),
  });

  return (
    <>
      {isLoading && <NotificationPostSkeleton />}
      {post?.data && (
        <FeedPost
          post={post.data.thread as AppBskyFeedDefs.FeedViewPost}
          filter={filter}
        />
      )}
    </>
  );
}
