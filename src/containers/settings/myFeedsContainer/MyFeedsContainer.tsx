"use client";

import { getSavedFeeds } from "@/lib/api/bsky/feed";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import Image from "next/image";
import { SavedFeed } from "../../../../types/feed";
import Button from "@/components/actions/button/Button";
import useSaveFeed from "@/lib/hooks/bsky/feed/useSaveFeed";
import Alert from "@/components/feedback/alert/Alert";
import MyFeedsContainerSkeleton from "./MyFeedsContainerSkeleton";
import { BiSolidTrash } from "react-icons/bi";
import { BiSolidBookmarkAlt } from "react-icons/bi";
import { useAgent } from "@/app/providers/agent";

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
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={(e) => {
            e.preventDefault();
            deleteFeed.mutate();
          }}
        >
          <BiSolidTrash className="text-status-danger text-lg" />
        </Button>

        <Button
          onClick={(e) => {
            e.preventDefault();
            togglePin.mutate();
          }}
        >
          <BiSolidBookmarkAlt
            className={`text-lg ${
              isPinned ? "text-status-success" : "text-skin-icon-muted"
            }`}
          />
        </Button>
      </div>
    </Link>
  );
}

export default function MyFeedsContainer() {
  const agent = useAgent();
  const { status, data, error, isLoading, isFetching } = useQuery({
    queryKey: savedFeedsQueryKey,
    queryFn: async () => {
      return getSavedFeeds(agent);
    },
  });

  if (isLoading || isFetching) return <MyFeedsContainerSkeleton />;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        My Feeds
      </h2>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
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
        <h2 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Saved Feeds
        </h2>
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
