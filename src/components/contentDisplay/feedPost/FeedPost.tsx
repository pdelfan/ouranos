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
import { ContentFilterResult } from "../../../../types/feed";
import { useState } from "react";
import PostHider from "@/components/dataDisplay/postHider/PostHider";
import { ViewRecord } from "@atproto/api/dist/client/types/app/bsky/embed/record";
import Link from "next/link";

interface Props {
  post: AppBskyFeedDefs.FeedViewPost;
  isParent?: boolean;
  isReply?: boolean;
  filter: ContentFilterResult;
}

export default function FeedPost(props: Props) {
  const { post, isReply, isParent, filter } = props;
  const { author, indexedAt } = post.post;
  const { reason, reply } = post;

  const { isAdultContentHidden, adultContentFilters } = filter;
  const label = post.post.labels?.map((l) => l.val)[0] ?? ""; // ex. "nsfw", "suggestive"
  const embedLabel =
    post.post.embed && post.post.embed.record
      ? (post.post.embed.record as ViewRecord)?.labels?.map((l) => l.val)[0] ??
        ""
      : "";
  const message =
    adultContentFilters.find((f) => f.values.includes(label || embedLabel))
      ?.message ?? "Adult content";
  const visibility = adultContentFilters.find((f) =>
    f.values.includes(label || embedLabel)
  )?.visiblity;

  const [hidden, setHidden] = useState(
    isAdultContentHidden
      ? true
      : visibility === "hide" || visibility === "warn"
      ? true
      : false
  );

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
          <Link
            href={`/dashboard/user/${author.handle}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="z-20 shrink-0 hover:brightness-90"
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
                onClick={(e) => {
                  e.stopPropagation();
                }}
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
            {visibility !== "show" &&
              visibility !== "ignore" &&
              (label || embedLabel) && (
                <div className="my-2">
                  <PostHider
                    message={message}
                    hidden={hidden}
                    onToggleVisibility={setHidden}
                    showToggle={visibility === "warn"}
                  />
                </div>
              )}
            {!hidden && (
              <>
                <PostText record={post.post.record} />
                {post.post.embed && (
                  <PostEmbed content={post.post.embed} depth={0} />
                )}
              </>
            )}
            <div className="mt-2">
              <PostActions post={post.post} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
