"use client";

import { SavedFeed } from "../../../../types/feed";
import Image from "next/image";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import Button from "@/components/actions/button/Button";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useState } from "react";
import { togglePinFeed } from "@/lib/api/bsky/feed";
import { useRouter } from "next/navigation";

interface Props {
  feedItem: SavedFeed;
}

export default function SavedFeedItem(props: Props) {
  const { feedItem } = props;
  const { avatar, displayName, creator, pinned } = feedItem;
  const [isPinned, setIsPinned] = useState(pinned);
  const agent = useAgent();
  const router = useRouter();

  const handleUnpin = async () => {
    if (!agent) return;
    setIsPinned((prev) => !prev);
    try {
      const response = await togglePinFeed(agent, feedItem.uri);
      if (!response.success) {
        setIsPinned((prev) => !prev);
      }
    } catch (error) {
      setIsPinned((prev) => !prev);
    } finally {
      router.refresh();
    }
  };

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

      <Button
        icon="bxs:bookmark-alt"
        iconColor={`${isPinned ? "text-emerald-600" : "text-neutral-300"}`}
        onClick={handleUnpin}
      />
    </article>
  );
}
