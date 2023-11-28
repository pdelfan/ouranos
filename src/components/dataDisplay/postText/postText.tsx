"use client";

import { getHandle } from "@/lib/utils/text";
import { RichText as RichTextHelper, AppBskyFeedPost } from "@atproto/api";
import type { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  record: PostView["record"];
  truncate?: boolean;
  mode?: "thread" | "feed";
}

export default function PostText(props: Props) {
  const { record, truncate, mode = "feed" } = props;
  const text = AppBskyFeedPost.isRecord(record) && record.text;
  const facet = AppBskyFeedPost.isRecord(record) && record.facets;

  const richText = new RichTextHelper({
    text: text.toString(),
    facets: facet ? facet : [],
  });

  const content: { text: string; component: JSX.Element }[] = [];

  for (const segment of richText.segments()) {
    if (segment.isMention()) {
      content.push({
        text: segment.text,
        component: (
          <Link
            className="text-primary break-words hover:text-primary-dark"
            href={`/dashboard/user/${getHandle(segment.text)}`}
            key={segment.mention?.did}
            onClick={(e) => e.stopPropagation()}
          >
            {segment.text}
          </Link>
        ),
      });
    } else if (segment.isLink()) {
      content.push({
        text: segment.text,
        component: (
          <Link
            className="text-primary break-all hover:text-primary-dark"
            href={segment.link?.uri!}
            target="blank"
            key={segment.link?.uri}
            onClick={(e) => e.stopPropagation()}
          >
            {segment.text}
          </Link>
        ),
      });
    } else if (segment.isTag()) {
      const encodedTag = encodeURIComponent(segment.tag?.tag!);
      content.push({
        text: segment.text,
        component: (
          <Link
            href={`/dashboard/search?query=${encodedTag}`}
            key={segment.text}
            className="text-primary break-all hover:text-primary-dark"
            onClick={(e) => e.stopPropagation()}
          >
            {segment.text}
          </Link>
        ),
      });
    } else {
      content.push({
        text: segment.text,
        component: <span key={segment.text}>{segment.text}</span>,
      });
    }
  }

  return (
    <div
      dir="auto"
      className={`whitespace-pre-wrap [overflow-wrap:anywhere] ${
        truncate && "line-clamp-6"
      } ${mode === "feed" ? "text-base leading-5" : "text-lg leading-6"}`}
    >
      {content.map((segment, i) => (
        <Fragment key={`${i}+${text}`}>{segment.component}</Fragment>
      ))}
    </div>
  );
}
