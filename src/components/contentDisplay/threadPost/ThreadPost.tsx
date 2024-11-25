"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import PostActions from "@/components/dataDisplay/postActions/PostActions";
import PostEmbed from "@/components/dataDisplay/postEmbed/PostEmbed";
import PostText from "@/components/dataDisplay/postText/postText";
import { getFormattedDate } from "@/lib/utils/time";
import { AppBskyFeedDefs } from "@atproto/api";
import { useRouter } from "next/navigation";
import { ContentFilterResult } from "../../../../types/feed";
import { useEffect, useRef, useState } from "react";
import PostHider from "@/components/dataDisplay/postHider/PostHider";
import Link from "next/link";
import { getThreadPostFilter } from "@/lib/utils/feed";
import ProfileHoverCard from "../profileHoverCard/ProfileHoverCard";

interface Props {
  post: AppBskyFeedDefs.PostView;
  filter: ContentFilterResult;
}

export default function ThreadPost(props: Props) {
  const { post, filter } = props;
  const { author } = post;
  const { showToggle, shouldHide, message } = getThreadPostFilter(post, filter);
  const [hidden, setHidden] = useState(shouldHide);
  const router = useRouter();
  const threadPostRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!threadPostRef.current) return;
    // scroll to thread post
    threadPostRef.current.scrollIntoView();
  }, []);

  return (
    <article ref={threadPostRef}>
      <div className="relative flex items-start gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/dashboard/user/${author.handle}`);
          }}
          className="z-20 shrink-0 hover:brightness-90"
        >
          <ProfileHoverCard handle={author.handle}>
            <Avatar
              src={author.avatar?.replace("avatar", "avatar_thumbnail")}
              size="md"
            />
          </ProfileHoverCard>
        </button>
        <div className="flex grow flex-col">
          <div className="flex flex-col">
            <Link
              href={`/dashboard/user/${author.handle}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex gap-1"
            >
              <span className="text-skin-base hover:text-skin-secondary line-clamp-1 max-w-[90%] shrink-0 overflow-ellipsis break-all font-semibold">
                {author.displayName || author.handle}{" "}
              </span>
            </Link>
            <span className="text-skin-tertiary line-clamp-1 min-w-[10%] shrink break-all font-medium">
              @{author.handle}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <PostText record={post.record} mode="thread" />
        {showToggle && (
          <div className="my-2">
            <PostHider
              message={message}
              hidden={hidden}
              onToggleVisibility={setHidden}
              showToggle={shouldHide}
            />
          </div>
        )}
        {!hidden && post.embed && <PostEmbed content={post.embed} depth={0} />}
        <div className="text-sm text-skin-tertiary mt-3 font-medium">
          {getFormattedDate(post.indexedAt)}
        </div>
      </div>
      <PostActions post={post} mode="thread" />
    </article>
  );
}
