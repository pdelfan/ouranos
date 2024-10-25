"use client";

import { useComposerControls } from "@/app/providers/composer";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

interface Props {
  avatar?: string;
  post: AppBskyFeedDefs.PostView;
}

export default function ComposePrompt(props: Props) {
  const { avatar, post } = props;
  const canReply = !post.viewer?.replyDisabled || false;
  const { openComposer } = useComposerControls();

  if (!canReply) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        const text = AppBskyFeedPost.isRecord(post.record) && post.record.text;

        openComposer({
          replyTo: {
            uri: post.uri,
            cid: post.cid,
            text: text.toString(),
            author: {
              handle: post.author.handle,
              displayName: post.author.displayName,
              avatar: post.author.avatar,
            },
          },
        });
      }}
      className="flex items-center gap-2"
    >
      <Avatar src={avatar?.replace("avatar", "avatar_thumbnail")} size="sm" />
      <span className="text-skin-tertiary font-medium">Write your reply</span>
    </button>
  );
}
