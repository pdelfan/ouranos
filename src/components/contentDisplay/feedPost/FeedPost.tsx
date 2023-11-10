"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import PostActions from "@/components/dataDisplay/postActions/PostActions";
import PostEmbed from "@/components/dataDisplay/postEmbed/PostEmbed";
import PostText from "@/components/dataDisplay/postText/postText";
import { getRelativeTime } from "@/lib/utils/time";
import { AppBskyEmbedImages, AppBskyFeedDefs } from "@atproto/api";
import Link from "next/link";

interface Props {
  post: AppBskyFeedDefs.FeedViewPost;
}

export default function FeedPost(props: Props) {
  const { post } = props;
  const { author, indexedAt } = post.post;

  return (
    <div className="flex justify-between items-center gap-2 p-3 border border-x-0 sm:border-x sm:last:rounded-b-2xl first:border-t-0 last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50">
      <div className="flex items-start gap-3">
        <Avatar profile={author} size="md" />
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
          <div>
            <PostText post={post.post} />
          </div>
          {post.post.embed && <PostEmbed content={post.post.embed} />}
          <PostActions post={post.post} />
        </div>
      </div>
    </div>
  );
}
