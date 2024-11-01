import Image from "next/image";
import { AppBskyFeedDefs } from "@atproto/api";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import { BiSolidHeart } from "react-icons/bi";
import Link from "next/link";

interface Props {
  feed: AppBskyFeedDefs.GeneratorView;
  depth: number;
}

export default function FeedEmbed(props: Props) {
  const { feed, depth } = props;

  return (
    <>
      {depth < 2 && (
        <Link
          href={{
            pathname: `/dashboard/feeds/${encodeURIComponent(
              feed.uri.split(":")[3].split("/")[0],
            )}`,
            query: { uri: feed.uri },
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="border-skin-base bg-skin-base mt-2 flex flex-col gap-2 rounded-2xl border p-3 hover:bg-skin-secondary"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Image
                src={feed.avatar ?? FallbackFeed}
                alt={feed.displayName}
                width={40}
                height={40}
                className={`rounded-lg ${!feed.avatar && "bg-skin-muted border-skin-base border"}`}
              />
              <div className="flex flex-col">
                <h2 className="text-skin-base break-words font-medium">
                  {feed.displayName}
                </h2>
                <h3 className="text-skin-tertiary font-medium break-all text-sm">
                  By @{feed.creator.handle}
                </h3>
              </div>
            </div>
          </div>
          {feed.description && (
            <p className="text-skin-base line-clamp-3 whitespace-pre-wrap [overflow-wrap:anywhere]">
              {feed.description}
            </p>
          )}
          <small className="text-skin-secondary flex items-center gap-1 font-medium">
            <BiSolidHeart />
            <span>{feed.likeCount ?? 0}</span>
          </small>
        </Link>
      )}
    </>
  );
}
