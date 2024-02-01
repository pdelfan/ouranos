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
          className="mt-2 flex flex-col gap-2 rounded-2xl border bg-white p-3 hover:brightness-95"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Image
                src={feed.avatar ?? FallbackFeed}
                alt={feed.displayName}
                width={40}
                height={40}
                className={`rounded-lg ${!feed.avatar && "border"}`}
              />
              <div className="flex flex-col">
                <h2 className="break-words font-semibold text-neutral-700">
                  {feed.displayName}
                </h2>
                <h3 className="break-all text-sm text-neutral-500">
                  By @{feed.creator.handle}
                </h3>
              </div>
            </div>
          </div>
          {feed.description && (
            <p className="line-clamp-3 break-words text-neutral-700">
              {feed.description}
            </p>
          )}
          <small className="flex items-center gap-1 font-medium text-neutral-500">
            <BiSolidHeart />
            <span>{feed.likeCount ?? 0}</span>
          </small>
        </Link>
      )}
    </>
  );
}
