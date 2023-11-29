"use client";

import { getHandle } from "@/lib/utils/text";
import { RichText as RichTextHelper } from "@atproto/api";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  description: string;
}

export default function ProfileBio(props: Props) {
  const { description } = props;

  const richText = new RichTextHelper({
    text: description.toString(),
  });

  richText.detectFacetsWithoutResolution();

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
    <div dir="auto" className="whitespace-pre-wrap [overflow-wrap:anywhere]">
      {content.map((segment, i) => (
        <Fragment key={`${i}+${description}`}>{segment.component}</Fragment>
      ))}
    </div>
  );
}