"use client";

import { useComposerControls } from "@/app/providers/composer";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";

interface Props {
  avatar?: string;
  post: AppBskyFeedDefs.PostView;
  rounded?: boolean;
}

export default function ComposePrompt(props: Props) {
  const { avatar, post, rounded } = props;
  const { openComposer } = useComposerControls();

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
      className={`flex items-center w-full gap-3 px-3 py-2 hover:bg-neutral-50 ${
        rounded ? "border rounded-b-2xl" : "border-x border-t"
      }`}
    >
      <Avatar src={avatar} />
      <span className="font-medium text-neutral-400">Write your reply</span>
    </button>
  );
}
