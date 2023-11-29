"use client";

import Image from "next/image";
import useFeedInfo from "@/lib/hooks/bsky/feed/useFeedInfo";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@/components/actions/button/Button";
import { useEffect, useState } from "react";
import { getSavedFeeds, toggleSaveFeed } from "@/lib/api/bsky/feed";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useRouter } from "next/navigation";
import FeedHeaderSkeleton from "./FeedHeaderSkeleton";

interface Props {
  feed: string;
}

export default function FeedHeader(props: Props) {
  const { feed } = props;
  const router = useRouter();
  const agent = useAgent();
  const [isSaved, setIsSaved] = useState(false);
  const {
    feedInfo,
    isLoadingFeedInfo,
    isFetchingFeedInfo,
    isRefetchingFeedInfo,
    feedInfoError,
  } = useFeedInfo(feed);

  useEffect(() => {
    const updateFeedInfo = async () => {
      if (feedInfo && agent) {
        const savedFeeds = await getSavedFeeds(agent);
        setIsSaved(savedFeeds.some((savedFeed) => savedFeed.uri === feed));
      }
    };

    updateFeedInfo();
  }, [feedInfo, agent, feed]);

  const handleSave = async () => {
    if (!agent) return;
    setIsSaved((prev) => !prev);
    try {
      const response = await toggleSaveFeed(agent, feed);
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
    <>
      {isFetchingFeedInfo && <FeedHeaderSkeleton />}
      {feedInfo && (
        <>
          <article className="flex flex-col gap-2 p-3 border border-x-0 border-t-0 sm:border sm:rounded-t-2xl ">
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-3 items-center">
                <Image
                  src={feedInfo.view.avatar ?? FallbackFeed}
                  alt={feedInfo.view.displayName}
                  width={60}
                  height={60}
                  className={`rounded-lg ${!feedInfo.view.avatar && "border"}`}
                />
                <div className="flex flex-col">
                  <h2 className="text-xl text-neutral-700 font-semibold break-words">
                    {feedInfo.view.displayName}
                  </h2>
                  <h3 className="text-neutral-500 break-all">
                    By @{feedInfo.view.creator.handle}
                  </h3>
                </div>
              </div>
              <div className="flex">
                <Button
                  icon={`${isSaved ? "bx:trash" : "bx:plus"}`}
                  iconColor={`${isSaved ? "text-red-500" : "text-green-600"}`}
                  onClick={handleSave}
                />
              </div>
            </div>
            <p className="text-neutral-700 break-words" dir="auto">
              {feedInfo.view.description}
            </p>
            <small className="flex items-center gap-1 font-medium text-neutral-500">
              <Icon icon="bxs:heart" />
              <span>{feedInfo.view.likeCount ?? 0}</span>
            </small>
          </article>
        </>
      )}
    </>
  );
}
