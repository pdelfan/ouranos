"use client";

import { SavedFeed } from "../../../../types/feed";
import Image from "next/image";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import Link from "next/link";

interface Props {
  feedItem: SavedFeed;
}

export default function SavedFeedItem(props: Props) {
  const { feedItem } = props;
  const { avatar, displayName } = feedItem;

  return (
    <Link
      href={{
        pathname: `/dashboard/feeds/${encodeURIComponent(
          feedItem.uri.split(":")[3].split("/")[0],
        )}`,
        query: { uri: feedItem.uri },
      }}
      className="border-skin-base hover:bg-skin-secondary flex items-center justify-between gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={avatar ?? FallbackFeed}
          alt={displayName}
          width={40}
          height={40}
          className={`rounded-lg ${!avatar && "border-skin-base bg-skin-muted border"}`}
        />
        <h2 className="text-skin-base break-words font-semibold">
          {feedItem.displayName}
        </h2>
      </div>
    </Link>
  );
}
