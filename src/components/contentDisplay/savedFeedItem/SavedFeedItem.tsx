"use client";

import { SavedFeed } from "../../../../types/feed";
import Image from "next/image";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  feedItem: SavedFeed;
}

export default function SavedFeedItem(props: Props) {
  const { feedItem } = props;
  const { avatar, displayName, creator, pinned } = feedItem;
  return (
    <article className="flex justify-between items-center gap-2 p-3 border border-x-0 sm:border-x sm:first:rounded-t-2xl sm:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
      <div className="flex flex-wrap gap-3 items-center">
        <Image
          src={avatar ?? FallbackFeed}
          alt={displayName}
          width={40}
          height={40}
          className={`rounded-lg ${!avatar && "border"}`}
        />
        <div className="flex flex-col">
          <h2 className="text-neutral-700 font-semibold break-words">
            {feedItem.displayName}
          </h2>
          <h3 className="text-neutral-500 break-all">By @{creator.handle}</h3>
        </div>
      </div>
      {pinned && (
        <button>
          <Icon icon="bxs:pin" className="text-2xl text-primary" />
        </button>
      )}
      {!pinned && (
        <button>
          <Icon icon="bxs:pin" className="text-2xl text-neutral-300" />
        </button>
      )}
    </article>
  );
}
