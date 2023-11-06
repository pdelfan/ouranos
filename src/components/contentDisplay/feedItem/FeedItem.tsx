"use client";

import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Image from "next/image";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@/components/actions/button/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAgent from "@/lib/hooks/useAgent";
import { toggleSaveFeed } from "@/lib/api/bsky/feed";

interface Props {
  feedItem: GeneratorView;
  saved: boolean;
}

export default function FeedItem(props: Props) {
  const { feedItem, saved } = props;
  const { avatar, displayName, description, likeCount, creator } = feedItem;
  const [isSaved, setIsSaved] = useState(saved);
  const router = useRouter();
  const agent = useAgent();

  const handleSave = async () => {
    if (!agent) return;
    setIsSaved((prev) => !prev);
    try {
      const response = await toggleSaveFeed(agent, feedItem.uri);
      if (!response.success) {
        setIsSaved((prev) => !prev);
      }
    } catch (error) {
      setIsSaved((prev) => !prev);
    } finally {
      router.refresh();
    }
  };

  return (
    <article className="flex flex-col gap-2 p-3 border border-x-0 sm:border-x sm:first:rounded-t-2xl sm:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
      <div className="flex flex-wrap gap-3 items-center justify-between">
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
            <h3 className="text-neutral-500 text-sm break-all">
              By @{creator.handle}
            </h3>
          </div>
        </div>
        <Button
          icon="bxs:heart"
          iconColor={`${isSaved ? "text-red-500" : "text-neutral-300"}`}
          onClick={handleSave}
        />
      </div>
      <p className="text-neutral-700 break-words">{description}</p>
      <small className="flex items-center gap-1 font-medium text-neutral-500">
        <Icon icon="bxs:heart" />
        <span>{likeCount ?? 0}</span>
      </small>
    </article>
  );
}
