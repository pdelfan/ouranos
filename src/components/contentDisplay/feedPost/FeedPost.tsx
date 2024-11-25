"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import PostActions from "@/components/dataDisplay/postActions/PostActions";
import PostEmbed from "@/components/dataDisplay/postEmbed/PostEmbed";
import PostText from "@/components/dataDisplay/postText/postText";
import Reason from "@/components/dataDisplay/reason/Reason";
import { AppBskyFeedDefs } from "@atproto/api";
import { ContentFilterResult } from "../../../../types/feed";
import PostHider from "@/components/dataDisplay/postHider/PostHider";
import Link from "next/link";
import Threadline from "@/components/dataDisplay/threadLine/ThreadLine";
import { getPostId } from "@/lib/utils/link";
import { getRelativeTime } from "@/lib/utils/time";
import { getPostFilter } from "@/lib/utils/feed";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileHoverCard from "../profileHoverCard/ProfileHoverCard";
import NotFoundEmbed from "@/components/dataDisplay/postEmbed/NotFoundEmbed";

interface Props {
  post: AppBskyFeedDefs.FeedViewPost;
  isParent?: boolean;
  isReply?: boolean;
  filter: ContentFilterResult;
}

export default function FeedPost(props: Props) {
  const { post, isReply, isParent, filter } = props;
  const { author, indexedAt } = post.post;
  const { reason } = post;
  const { showToggle, shouldHide, message } = getPostFilter(post, filter);
  const [hidden, setHidden] = useState(shouldHide);
  const router = useRouter();
  const notFound = post.post.viewer === undefined;
  const isAuthorMuted = !notFound && post.post.author?.viewer?.muted;
  const [showPost, setShowPost] = useState(!isAuthorMuted);

  if (notFound) {
    return (
      <article>
        <NotFoundEmbed depth={0} />
        {isParent && !reason && (
          <div className="px-3 -mt-9">
            <div className="relative flex items-start gap-3">
              <div className={`flex grow flex-col ${isParent && "pb-12"}`}>
                <Threadline />
              </div>
            </div>
          </div>
        )}
      </article>
    );
  }

  if (!showPost) {
    return (
      <article className="p-3">
        {reason && <Reason reason={reason} />}
        <div className="relative flex items-start gap-3">
          <Avatar size="md" className="z-20 shrink-0" />
          <div className={`flex grow flex-col ${isParent && "pb-6"}`}>
            {isParent && !reason && <Threadline />}
            <PostHider
              message={"Post by muted user"}
              hidden={true}
              onToggleVisibility={() => setShowPost(true)}
              showToggle={true}
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={(e) => {
        e.stopPropagation();
        router.push(
          `/dashboard/user/${post.post.author.handle}/post/${getPostId(
            post.post.uri,
          )}`,
        );
      }}
      className="cursor-pointer hover:bg-skin-secondary p-3"
    >
      {reason && <Reason reason={reason} />}

      <div className="relative flex items-start gap-3">
        <div
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
        </div>
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
              <span className="text-skin-base hover:text-skin-secondary line-clamp-1 max-w-[90%] shrink-0 overflow-ellipsis break-all font-semibold">
                {author.displayName || author.handle}{" "}
              </span>
              <span className="text-skin-tertiary line-clamp-1 min-w-[10%] shrink break-all font-medium">
                @{author.handle}
              </span>
            </Link>
            <span className="text-skin-tertiary whitespace-nowrap font-medium">
              &nbsp;· {getRelativeTime(indexedAt)}
            </span>
          </div>
          <PostText record={post.post.record} />
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
          {!hidden && post.post.embed && (
            <PostEmbed content={post.post.embed} depth={0} />
          )}
          <div className="mt-2">
            <PostActions post={post.post} />
          </div>
        </div>
      </div>
    </article>
  );
}
