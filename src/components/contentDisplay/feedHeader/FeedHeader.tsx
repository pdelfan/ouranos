"use client";

import Image from "next/image";
import useFeedInfo, { feedInfoKey } from "@/lib/hooks/bsky/feed/useFeedInfo";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import Button from "@/components/actions/button/Button";
import { useLayoutEffect, useState } from "react";
import {
  likeFeed,
  unlikeFeed,
  togglePinFeed,
  toggleSaveFeed,
} from "@/lib/api/bsky/feed";
import { useRouter } from "next/navigation";
import FeedHeaderSkeleton from "./FeedHeaderSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { savedFeedsQueryKey } from "@/containers/settings/myFeedsContainer/MyFeedsContainer";
import { BiHeart, BiSolidTrash } from "react-icons/bi";
import { BiSolidBookmarkAlt } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { BiSolidHeart } from "react-icons/bi";
import Link from "next/link";
import { useAgent } from "@/app/providers/agent";

interface Props {
  feed: string;
}

export default function FeedHeader(props: Props) {
  const { feed } = props;
  const agent = useAgent();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState<boolean | null>(null);
  const [isPinned, setIsPinned] = useState<boolean | null>(null);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [likeUri, setLikeUri] = useState<string | undefined>(undefined);
  const [likeCount, setLikeCount] = useState<number>(0);
  const queryClient = useQueryClient();
  const {
    feedInfo,
    isLoadingFeedInfo,
    isFetchingFeedInfo,
    isRefetchingFeedInfo,
    feedInfoError,
  } = useFeedInfo(feed);

  useLayoutEffect(() => {
    if (feedInfo) {
      setIsSaved(feedInfo.isSaved);
      setIsPinned(feedInfo.isPinned);
      setIsLiked(feedInfo.isLiked);
      setLikeUri(feedInfo.view.viewer?.like);
    }
  }, [feedInfo]);

  const toggleSave = async () => {
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
      queryClient.invalidateQueries({ queryKey: savedFeedsQueryKey });
    }
  };

  const togglePin = async () => {
    setIsPinned((prev) => !prev);
    try {
      const response = await togglePinFeed(agent, feed);
      if (!response.success) {
        setIsPinned((prev) => !prev);
      }
    } catch (error) {
      setIsPinned((prev) => !prev);
    } finally {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: savedFeedsQueryKey });
    }
  };

  const toggleLike = async () => {
    setIsLiked((prev) => !prev);
    if (!likeUri && feedInfo) {
      try {
        const like = await likeFeed(
          agent,
          feedInfo?.view.uri,
          feedInfo?.view.cid,
        );
        setLikeUri(like?.uri);
      } catch (err) {
        setIsLiked(false);
      }
    } else if (likeUri && feedInfo) {
      try {
        await unlikeFeed(agent, likeUri);
        setLikeUri(undefined);
      } catch (err) {
        setIsLiked(true);
      }
    }
  };

  return (
    <>
      {isFetchingFeedInfo && <FeedHeaderSkeleton />}
      {!isFetchingFeedInfo && feedInfo && (
        <>
          <article className="border-skin-base flex flex-col gap-2 border border-x-0 border-t-0 p-3 md:rounded-t-2xl md:border">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <Image
                  src={feedInfo.view.avatar ?? FallbackFeed}
                  alt={feedInfo.view.displayName}
                  width={60}
                  height={60}
                  className={`rounded-lg ${!feedInfo.view.avatar && "border-skin-base bg-skin-muted border"}`}
                />
                <div className="flex flex-col">
                  <h2 className="text-skin-base break-words text-xl font-semibold">
                    {feedInfo.view.displayName}
                  </h2>
                  <h3 className="text-skin-secondary break-all">
                    By{" "}
                    <Link
                      href={`/dashboard/user/${feedInfo.view.creator.handle}`}
                      className="hover:text-skin-tertiary font-medium"
                    >
                      @{feedInfo.view.creator.handle}
                    </Link>
                  </h3>
                </div>
              </div>
              {isSaved !== null && isPinned !== null && (
                <div className="flex flex-wrap gap-3">
                  <Button onClick={toggleSave}>
                    {isSaved && (
                      <BiSolidTrash className="text-status-danger text-lg" />
                    )}
                    {!isSaved && (
                      <BiPlus className="text-skin-icon-base text-lg" />
                    )}
                  </Button>
                  <Button onClick={togglePin}>
                    <BiSolidBookmarkAlt
                      className={`text-lg ${
                        isPinned
                          ? "text-status-success"
                          : "text-skin-icon-muted"
                      }`}
                    />
                  </Button>
                  <Button onClick={toggleLike}>
                    {likeUri && (
                      <BiSolidHeart className="text-skin-icon-like text-lg" />
                    )}
                    {!likeUri && (
                      <BiHeart className="text-skin-icon-muted text-lg" />
                    )}
                  </Button>
                </div>
              )}
            </div>
            {feedInfo.view.description && (
              <p className="text-skin-base break-words" dir="auto">
                {feedInfo.view.description}
              </p>
            )}
            <small className="text-skin-secondary flex items-center gap-1 font-medium">
              <BiSolidHeart className="text-skin-icon-base" />
              <span>{feedInfo.view.likeCount}</span>
            </small>
          </article>
        </>
      )}
    </>
  );
}
