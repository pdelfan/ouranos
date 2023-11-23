"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import PostActions from "@/components/dataDisplay/postActions/PostActions";
import PostEmbed from "@/components/dataDisplay/postEmbed/PostEmbed";
import PostText from "@/components/dataDisplay/postText/postText";
import { getRelativeTime } from "@/lib/utils/time";
import { AppBskyFeedDefs } from "@atproto/api";
import Link from "next/link";

interface Props {
  post: AppBskyFeedDefs.PostView;
  isReply?: boolean;
  hasReply?: boolean;
}

export default function SearchPost(props: Props) {
  const { post } = props;
  const { author, indexedAt } = post;

  return (
    <div className="flex justify-between items-center gap-2 p-3 border border-x-0 sm:border-x  first:border-t-0 last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <Link
          href={`/dashboard/user/${author.handle}`}
          className="shrink-0 hover:brightness-90"
        >
          <Avatar profile={author} size="md" />
        </Link>
        <div className="flex flex-col">
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
            <PostText record={post.record} />          
          {post.embed && <PostEmbed content={post.embed} depth={0} />}
          <PostActions post={post} />
        </div>
      </div>
    </div>
  );
}
