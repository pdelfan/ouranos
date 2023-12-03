"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import PostActions from "@/components/dataDisplay/postActions/PostActions";
import PostEmbed from "@/components/dataDisplay/postEmbed/PostEmbed";
import PostText from "@/components/dataDisplay/postText/postText";
import { getFormattedDate, getRelativeTime } from "@/lib/utils/time";
import { AppBskyFeedDefs } from "@atproto/api";
import { useRouter } from "next/navigation";
import { ContentFilterResult } from "../../../../types/feed";
import { useState } from "react";
import PostHider from "@/components/dataDisplay/postHider/PostHider";
import { ViewRecord } from "@atproto/api/dist/client/types/app/bsky/embed/record";
import Link from "next/link";

interface Props {
  post: AppBskyFeedDefs.PostView;
  filter: ContentFilterResult;
}

export default function ThreadPost(props: Props) {
  const { post, filter } = props;
  const { author, indexedAt, reply } = post;

  const { isAdultContentHidden, adultContentFilters } = filter;
  const label = post.labels?.map((l) => l.val)[0] ?? ""; // ex. "nsfw", "suggestive"
  const embedLabel =
    post.embed && post.embed.record
      ? (post.embed.record as ViewRecord)?.labels?.map((l) => l.val)[0] ?? ""
      : "";
  const message =
    adultContentFilters.find((f) => f.values.includes(label || embedLabel))
      ?.message ?? "Adult content";
  const visibility = adultContentFilters.find((f) =>
    f.values.includes(label || embedLabel)
  )?.visibility;

  const [hidden, setHidden] = useState(
    isAdultContentHidden
      ? true
      : visibility === "hide" || visibility === "warn"
      ? true
      : false
  );

  const router = useRouter();

  return (
    <article className="p-3 md:border-x border-t last:border-b md:last:rounded-b-2xl">
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
        <div className={`flex flex-col grow`}>
          <div className="flex flex-col">
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
            </Link>
            <span className="text-neutral-400 font-medium line-clamp-1 break-all shrink min-w-[10%]">
              @{author.handle}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3">
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
            <PostText record={post.record} mode="thread" />
            {post.embed && <PostEmbed content={post.embed} depth={0} />}
          </>
        )}
        <div className="mt-3 text-neutral-400 font-medium">
          {getFormattedDate(post.indexedAt)}
        </div>
      </div>
      <PostActions post={post} mode="thread" />
    </article>
  );
}
