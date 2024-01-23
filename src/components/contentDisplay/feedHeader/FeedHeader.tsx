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
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useRouter } from "next/navigation";
import FeedHeaderSkeleton from "./FeedHeaderSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { savedFeedsQueryKey } from "@/containers/settings/myFeedsContainer/MyFeedsContainer";
import { BiHeart, BiSolidTrash } from "react-icons/bi";
import { BiSolidBookmarkAlt } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { BiSolidHeart } from "react-icons/bi";
import Link from "next/link";

interface Props {
  feed: string;
}

export default function FeedHeader(props: Props) {
  const { feed } = props;
  const router = useRouter();
  const agent = useAgent();
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
      queryClient.invalidateQueries({ queryKey: savedFeedsQueryKey });
    }
  };

  const togglePin = async () => {
    if (!agent) return;
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
    if (!agent) return;
    setIsLiked((prev) => !prev);
    if (!likeUri && feedInfo) {
      try {
        const like = await likeFeed(
          agent,
          feedInfo?.view.uri,
          feedInfo?.view.cid
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
          <article className="flex flex-col gap-2 p-3 border border-x-0 border-t-0 md:border md:rounded-t-2xl ">
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
                    By{" "}
                    <Link
                      href={`/dashboard/user/${feedInfo.view.creator.handle}`}
                      className="font-medium hover:text-neutral-400"
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
                      <BiSolidTrash className="text-lg text-red-600" />
                    )}
                    {!isSaved && <BiPlus className="text-lg text-green-600" />}
                  </Button>
                  <Button onClick={togglePin}>
                    <BiSolidBookmarkAlt
                      className={`text-lg ${
                        isPinned ? "text-green-600" : "text-neutral-300"
                      }`}
                    />
                  </Button>
                  <Button onClick={toggleLike}>
                    {likeUri && (
                      <BiSolidHeart className="text-lg text-red-600" />
                    )}
                    {!likeUri && (
                      <BiHeart className="text-lg text-neutral-300" />
                    )}
                  </Button>
                </div>
              )}
            </div>
            <p className="text-neutral-700 break-words" dir="auto">
              {feedInfo.view.description}
            </p>
            <small className="flex items-center gap-1 font-medium text-neutral-500">
              <BiSolidHeart />
              <span>{feedInfo.view.likeCount}</span>
            </small>
          </article>
        </>
      )}
    </>
  );
}
