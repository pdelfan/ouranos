"use client";

import { getHandle } from "@/lib/utils/text";
import { RichText as RichTextHelper, AppBskyFeedPost } from "@atproto/api";
import type { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  record: PostView["record"];
  truncate?: boolean;
}

export default function PostText(props: Props) {
  const { record, truncate } = props;
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
            className="text-primary break-words"
            href={`/dashboard/user/${getHandle(segment.text)}`}
            key={segment.mention?.did}
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
            className="text-primary break-all"
            href={segment.link?.uri!}
            target="blank"
            key={segment.link?.uri}
          >
            {segment.text}
          </Link>
        ),
      });
    } else if (segment.isTag()) {
      content.push({
        text: segment.text,
        component: (
          <span key={segment.text} className="text-primary break-all">
            {segment.text}
          </span>
        ),
      });
    } else {
      content.push({
        text: segment.text,
        component: (
          <span className="break-words " key={segment.text}>
            {segment.text}
          </span>
        ),
      });
    }
  }

  return (
    <div
      className={`leading-5 whitespace-pre-wrap break-words	${
        truncate && "line-clamp-6"
      }`}
    >
      {content.map((segment, i) => (
        <Fragment key={`${i}+${text}`}>{segment.component}</Fragment>
      ))}
    </div>
  );
}
