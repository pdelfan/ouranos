"use client";

import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Image from "next/image";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import { BiPlus, BiSolidHeart, BiSolidTrash } from "react-icons/bi";
import Button from "@/components/actions/button/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { toggleSaveFeed } from "@/lib/api/bsky/feed";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { savedFeedsQueryKey } from "@/containers/settings/myFeedsContainer/MyFeedsContainer";

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
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: savedFeedsQueryKey });
    }
  };

  return (
    <Link
      href={{
        pathname: `/dashboard/feeds/${encodeURIComponent(
          feedItem.uri.split(":")[3].split("/")[0],
        )}`,
        query: { uri: feedItem.uri },
      }}
      className="flex flex-col gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Image
            src={avatar ?? FallbackFeed}
            alt={displayName}
            width={40}
            height={40}
            className={`rounded-lg ${!avatar && "border"}`}
          />
          <div className="flex flex-col">
            <h2 className="break-words font-semibold text-neutral-700">
              {feedItem.displayName}
            </h2>
            <h3 className="break-all text-sm text-neutral-500">
              By @{creator.handle}
            </h3>
          </div>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {isSaved && <BiSolidTrash className="text-lg text-red-600" />}
          {!isSaved && <BiPlus className="text-lg text-green-600" />}
        </Button>
      </div>
      <p className="break-words text-neutral-700">{description}</p>
      <small className="flex items-center gap-1 font-medium text-neutral-500">
        <BiSolidHeart />
        <span>{likeCount ?? 0}</span>
      </small>
    </Link>
  );
}
