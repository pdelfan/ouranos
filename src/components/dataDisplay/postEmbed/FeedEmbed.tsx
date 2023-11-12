import Image from "next/image";
import { AppBskyFeedDefs } from "@atproto/api";
import FallbackFeed from "@/assets/images/fallbackFeed.png";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  feed: AppBskyFeedDefs.GeneratorView;
}

export default function FeedEmbed(props: Props) {
  const { feed } = props;
  return (
    <article className="flex flex-col gap-2 p-3 bg-white border rounded-2xl hover:brightness-95">
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
        <Icon icon="bxs:heart" />
        <span>{feed.likeCount ?? 0}</span>
      </small>
    </article>
  );
}
