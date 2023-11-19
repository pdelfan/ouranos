"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import PostActions from "@/components/dataDisplay/postActions/PostActions";
import PostEmbed from "@/components/dataDisplay/postEmbed/PostEmbed";
import PostText from "@/components/dataDisplay/postText/postText";
import Reason from "@/components/dataDisplay/reason/Reason";
import { getPostId } from "@/lib/utils/link";
import { getRelativeTime } from "@/lib/utils/time";
import { AppBskyFeedDefs } from "@atproto/api";
import { useRouter } from "next/navigation";

interface Props {
  post: AppBskyFeedDefs.FeedViewPost;
  isParent?: boolean;
  isReply?: boolean;
}

export default function FeedPost(props: Props) {
  const { post, isReply, isParent } = props;
  const { author, indexedAt } = post.post;
  const { reason, reply } = post;
  const router = useRouter();

  return (
    <>
      {reason && <Reason reason={reason} />}
      <article
        onClick={(e) => {
          e.stopPropagation();
          router.push(
            `/dashboard/user/${post.post.author.handle}/post/${getPostId(
              post.post.uri
            )}`
          );
        }}
        className="cursor-pointer"
      >
        <div className="relative flex items-start gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/user/${author.handle}`);
            }}
            className="z-20 shrink-0 hover:brightness-90"
          >
            <Avatar profile={author} size="md" />
          </button>
          <div className={`flex flex-col grow ${isParent && "pb-6"}`}>
            {isParent && !reason && (
              <div className="absolute left-6 top-0 z-10 h-full border-l-2" />
            )}
            <div className="flex">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/dashboard/user/${author.handle}`);
                }}
                className="flex gap-1"
              >
                <span className="font-semibold break-all max-w-[90%] shrink-0 line-clamp-1 overflow-ellipsis hover:text-neutral-600">
                  {author.displayName ?? author.handle}{" "}
                </span>
                <span className="text-neutral-400 font-medium line-clamp-1 break-all shrink min-w-[10%]">
                  @{author.handle}
                </span>
              </button>
              <span className="text-neutral-400 font-medium whitespace-nowrap">
                &nbsp;· {getRelativeTime(indexedAt)}
              </span>
            </div>
            <PostText record={post.post.record} />
            {post.post.embed && (
              <PostEmbed content={post.post.embed} depth={0} />
            )}
            <PostActions post={post.post} />
          </div>
        </div>
      </article>
    </>
  );
}
