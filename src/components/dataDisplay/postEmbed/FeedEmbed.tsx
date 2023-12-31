import Image from "next/image";
import { AppBskyFeedDefs } from "@atproto/api";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import { BiSolidHeart } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  feed: AppBskyFeedDefs.GeneratorView;
  depth: number;
}

export default function FeedEmbed(props: Props) {
  const { feed, depth } = props;
  const router = useRouter();

  return (
    <>
      {depth < 2 && (
        <Link
          href={{
            pathname: `/dashboard/feeds/${encodeURIComponent(
              feed.uri.split(":")[3].split("/")[0]
            )}`,
            query: { uri: feed.uri },
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex flex-col gap-2 p-3 mt-2 bg-white border rounded-2xl hover:brightness-95"
        >
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <Image
                src={feed.avatar ?? FallbackFeed}
                alt={feed.displayName}
                width={40}
                height={40}
                className={`rounded-lg ${!feed.avatar && "border"}`}
              />
              <div className="flex flex-col">
                <h2 className="text-neutral-700 font-semibold break-words">
                  {feed.displayName}
                </h2>
                <h3 className="text-neutral-500 text-sm break-all">
                  By @{feed.creator.handle}
                </h3>
              </div>
            </div>
          </div>
          <p className="text-neutral-700 break-words line-clamp-3">
            {feed.description}
          </p>
          <small className="flex items-center gap-1 font-medium text-neutral-500">
            <BiSolidHeart />
            <span>{feed.likeCount ?? 0}</span>
          </small>
        </Link>
      )}
    </>
  );
}
