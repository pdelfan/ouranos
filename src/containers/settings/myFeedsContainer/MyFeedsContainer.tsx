"use client";

import { getSavedFeeds } from "@/lib/api/bsky/feed";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import Image from "next/image";
import { SavedFeed } from "../../../../types/feed";
import Button from "@/components/actions/button/Button";
import useSaveFeed from "@/lib/hooks/bsky/feed/useSaveFeed";
import Alert from "@/components/feedback/alert/Alert";
import MyFeedsContainerSkeleton from "./MyFeedsContainerSkeleton";

interface FeedItemProps {
  feedItem: SavedFeed;
}

export const savedFeedsQueryKey = ["savedFeeds"];

function FeedItem(props: FeedItemProps) {
  const { feedItem } = props;
  const { avatar, displayName } = feedItem;
  const { isPinned, togglePin, deleteFeed } = useSaveFeed({
    feedItem: feedItem,
  });

  return (
    <Link
      href={{
        pathname: `/dashboard/feeds/${encodeURIComponent(
          feedItem.uri.split(":")[3].split("/")[0]
        )}`,
        query: { uri: feedItem.uri },
      }}
      className="flex justify-between items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
    >
      <div className="flex flex-wrap gap-3 items-center">
        <Image
          src={avatar ?? FallbackFeed}
          alt={displayName}
          width={40}
          height={40}
          className={`rounded-lg ${!avatar && "border"}`}
        />
        <h2 className="text-neutral-700 font-semibold break-words">
          {feedItem.displayName}
        </h2>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          icon="bxs:trash"
          iconColor="text-red-600"
          onClick={(e) => {
            e.preventDefault();
            deleteFeed.mutate();
          }}
        />

        <Button
          icon="bxs:bookmark-alt"
          iconColor={`${isPinned ? "text-green-600" : "text-neutral-300"}`}
          onClick={(e) => {
            e.preventDefault();
            togglePin.mutate();
          }}
        />
      </div>
    </Link>
  );
}

export default function MyFeedsContainer() {
  const agent = useAgent();
  const { status, data, error, isLoading, isFetching } = useQuery({
    queryKey: ["savedFeeds"],
    queryFn: () => getSavedFeeds(agent),
  });

  if (isLoading || isFetching) return <MyFeedsContainerSkeleton />;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">My Feeds</h2>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Pinned Feeds
        </h3>
        <section className="flex flex-col">
          {data &&
            data
              .filter((feed) => feed.pinned)
              .map((feed) => <FeedItem key={feed.cid} feedItem={feed} />)}
          {data && data.filter((feed) => feed.pinned).length === 0 && (
            <Alert variant="info" message="You don't have any pinned feeds" />
          )}
        </section>
      </section>

      <section>
        <h2 className="text-xl font-semibold mx-3 md:mx-0 mb-2">Saved Feeds</h2>
        <section className="flex flex-col">
          {data &&
            data
              .filter((feed) => !feed.pinned)
              .map((feed) => <FeedItem key={feed.cid} feedItem={feed} />)}
          {data && data.filter((feed) => !feed.pinned).length === 0 && (
            <Alert variant="info" message="You don't have any saved feeds" />
          )}
        </section>
      </section>
    </section>
  );
}
