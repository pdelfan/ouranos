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
import Threadline from "@/components/dataDisplay/threadLine/ThreadLine";

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
  const { isAdultContentHidden, adultContentFilters, contentFilters } = filter;
  const label = post.post.labels?.map((l) => l.val)[0] ?? ""; // ex. "nsfw", "suggestive"
  const embedRecordLabel = (post?.post?.embed?.record as ViewRecord)
    ?.record as ViewRecord;
  const embedLabel =
    post.post.embed && post.post.embed.record
      ? (post.post.embed.record as ViewRecord)?.labels?.map((l) => l.val)[0] ??
        embedRecordLabel?.labels?.map((l) => l.val)[0] ??
        ""
      : "";
  const message =
    adultContentFilters.find((f) => f.values.includes(label || embedLabel))
      ?.message ||
    contentFilters.find((f) => f.values.includes(label))?.message ||
    "Marked content";
  const visibility = adultContentFilters.find((f) =>
    f.values.includes(label || embedLabel),
  )?.visibility;

  const [hidden, setHidden] = useState(
    isAdultContentHidden
      ? true
      : visibility === "hide" || visibility === "warn"
        ? true
        : false,
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
              post.post.uri,
            )}`,
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
            <Avatar src={author.avatar} size="md" />
          </Link>
          <div className={`flex grow flex-col ${isParent && "pb-6"}`}>
            {isParent && !reason && <Threadline />}
            <div className="flex">
              <Link
                href={`/dashboard/user/${author.handle}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex gap-1"
              >
                <span className="line-clamp-1 max-w-[90%] shrink-0 overflow-ellipsis break-all font-semibold text-neutral-700 hover:text-neutral-500">
                  {author.displayName ?? author.handle}{" "}
                </span>
                <span className="line-clamp-1 min-w-[10%] shrink break-all font-medium text-neutral-400">
                  @{author.handle}
                </span>
              </Link>
              <span className="whitespace-nowrap font-medium text-neutral-400">
                &nbsp;· {getRelativeTime(indexedAt)}
              </span>
            </div>
            <PostText record={post.post.record} />
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
