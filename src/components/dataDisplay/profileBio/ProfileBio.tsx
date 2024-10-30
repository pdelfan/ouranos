import { getHandle, getShortAddress } from "@/lib/utils/text";
import { RichText as RichTextHelper } from "@atproto/api";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  description: string;
  truncate?: boolean;
}

export default function ProfileBio(props: Props) {
  const { description, truncate } = props;

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
            className="text-skin-link-base hover:text-skin-link-hover break-words"
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
            className="text-skin-link-base hover:text-skin-link-hover inline-block break-all"
            href={segment.link!.uri}
            target="_blank"
            key={segment.link!.uri}
            onClick={(e) => e.stopPropagation()}
          >
            {getShortAddress(segment.link!.uri)}
          </Link>
        ),
      });
    } else if (segment.isTag()) {
      const encodedTag = encodeURIComponent(segment.tag?.tag!);
      content.push({
        text: segment.text,
        component: (
          <Link
            href={`/dashboard/search?query=%23${encodedTag}`}
            key={segment.text}
            className="text-skin-link-base hover:text-skin-link-hover break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {segment.text}
          </Link>
        ),
      });
    } else {
      content.push({
        text: segment.text,
        component: (
          <span key={segment.text} className="text-skin-base">
            {segment.text}
          </span>
        ),
      });
    }
  }

  return (
    <div
      dir="auto"
      className={`text-skin-base mt-3 whitespace-pre-wrap [overflow-wrap:anywhere] ${truncate && "line-clamp-6"}`}
    >
      {content.map((segment, i) => (
        <Fragment key={`${i}+${description}`}>{segment.component}</Fragment>
      ))}
    </div>
  );
}
