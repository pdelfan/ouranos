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
          feedItem.uri.split(":")[3].split("/")[0]
        )}`,
        query: { uri: feedItem.uri },
      }}
      className="flex justify-between items-center gap-2 p-3 border border-x-0 sm:border-x sm:first:rounded-t-2xl sm:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
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
    </Link>
  );
}
