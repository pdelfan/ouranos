"use client";

import { getHandle } from "@/lib/utils/text";
import { RichText as RichTextHelper, AppBskyFeedPost } from "@atproto/api";
import type { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Link from "next/link";

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

  const content: (JSX.Element | string)[] = [];

  for (const segment of richText.segments()) {
    if (segment.isMention()) {
      content.push(
        <Link
          className="text-primary"
          href={`/dashboard/user/${getHandle(segment.text)}`}
          key={segment.text + segment.facet}
        >
          {segment.text}
        </Link>
      );
    } else if (segment.isLink()) {
      content.push(
        <Link
          className="text-primary break-all"
          href={segment.link?.uri!}
          target="blank"
          key={segment.text + segment.link?.uri}
        >
          {segment.text}
        </Link>
      );
    } else if (segment.isTag()) {
      content.push(
        <span key={segment.text} className="text-primary">
          {segment.text}
        </span>
      );
    } else {
      content.push(segment.text);
    }
  }

  return (
    <div className={`leading-5 ${truncate && "line-clamp-6"}`}>{content}</div>
  );
}
