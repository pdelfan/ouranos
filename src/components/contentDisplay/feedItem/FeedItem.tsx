import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Image from "next/image";
import FallbackFeed from "@/assets/images/fallbackFeed.png";

interface Props {
  feedItem: GeneratorView;
}

export default function FeedItem(props: Props) {
  const { feedItem } = props;
  const { avatar, displayName, description, likeCount, creator } = feedItem;
  return (
    <article className="flex flex-col gap-2 p-3 border sm:first:rounded-t-2xl sm:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
      <div className="flex flex-wrap gap-3 items-start">
        <Image
          src={avatar ?? FallbackFeed}
          alt={displayName}
          width={40}
          height={40}
          className="rounded-lg"
        />
        <div className="flex flex-col">
          <h2 className="text-neutral-700 font-semibold break-words">
            {feedItem.displayName}
          </h2>
          <h3 className="text-neutral-500 break-all">By @{creator.handle}</h3>
        </div>
      </div>
      <p className="text-neutral-700 break-words">{description}</p>
      {likeCount && (
        <small className="font-medium">
          Liked by {likeCount} {likeCount > 1 ? "users" : "user"}{" "}
        </small>
      )}
    </article>
  );
}
