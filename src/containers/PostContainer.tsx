"use client";

import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import { AppBskyFeedDefs } from "@atproto/api";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { ContentFilterResult } from "../../types/feed";

interface Props {
  post: AppBskyFeedDefs.FeedViewPost;
  isReply?: boolean;
  filter: ContentFilterResult;
}

export default function PostContainer(props: Props) {
  const { post, isReply, filter } = props;
  const parent = {
    post: post?.reply?.parent as PostView,
  };

  return (
    <div>
      {parent?.post && (
        <FeedPost
          post={parent}
          isReply={isReply}
          isParent={true}
          filter={filter}
        />
      )}
      {
        <FeedPost
          post={post}
          isReply={false}
          isParent={false}
          filter={filter}
        />
      }
    </div>
  );
}
