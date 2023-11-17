"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import PostActions from "@/components/dataDisplay/postActions/PostActions";
import PostEmbed from "@/components/dataDisplay/postEmbed/PostEmbed";
import PostText from "@/components/dataDisplay/postText/postText";
import Reason from "@/components/dataDisplay/reason/Reason";
import { getRelativeTime } from "@/lib/utils/time";
import { AppBskyFeedDefs } from "@atproto/api";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Link from "next/link";

interface Props {
  post: AppBskyFeedDefs.FeedViewPost;
  isParent?: boolean;
  isReply?: boolean;
}

export default function FeedPost(props: Props) {
  const { post, isReply, isParent } = props;
  const { author, indexedAt } = post.post;
  const { reason, reply } = post;

  return (
    <div>
      {reason && <Reason reason={reason} />}
      <div className="relative flex items-start gap-3">
        <Link
          href={`/dashboard/user/${author.handle}`}
          className="shrink-0 hover:brightness-90 z-20"
        >
          <Avatar profile={author} size="md" />
        </Link>
        <div className={`flex flex-col grow ${isParent && "pb-6"}`}>
          {isParent && !reason && (
            <div className="absolute left-6 top-0 z-10 h-full border-l-2" />
          )}
          <div className="flex">
            <Link
              href={`/dashboard/user/${author.handle}`}
              className="flex gap-1"
            >
              <span className="font-semibold break-all max-w-[90%] shrink-0 line-clamp-1 overflow-ellipsis hover:text-neutral-600">
                {author.displayName ?? author.handle}{" "}
              </span>
              <span className="text-neutral-400 font-medium line-clamp-1 break-all shrink min-w-[10%]">
                @{author.handle}
              </span>
            </Link>
            <span className="text-neutral-400 font-medium whitespace-nowrap">
              &nbsp;· {getRelativeTime(indexedAt)}
            </span>
          </div>
          <PostText record={post.post.record} />
          {post.post.embed && <PostEmbed content={post.post.embed} depth={0} />}
          <PostActions post={post.post} />
        </div>
      </div>
    </div>
  );
}
