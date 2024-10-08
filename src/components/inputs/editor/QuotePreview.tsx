import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import { ComposerOptionsQuote } from "@/app/providers/composer";
import Image from "next/image";
import { getRelativeTime } from "@/lib/utils/time";
import { useState } from "react";

interface Props {
  post: ComposerOptionsQuote;
}

export default function QuoteToPreview(props: Props) {
  const { post } = props;
  const { author } = post || {};
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const selectedTextClass = showMore
    ? "max-h-48 overflow-auto"
    : "line-clamp-3";

  return (
    <article
      onClick={toggleShowMore}
      className="bg-skin-base border-skin-base flex cursor-pointer items-start gap-1 rounded-2xl border p-2"
    >
      <Image
        src={
          author.avatar?.replace("avatar", "avatar_thumbnail") ?? FallbackAvatar
        }
        alt="Avatar"
        width={20}
        height={20}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex gap-1">
          <span className="text-skin-base line-clamp-1 max-w-[90%] shrink-0 overflow-ellipsis break-all font-semibold">
            {author.displayName || author.handle}
          </span>
          <span className="text-skin-tertiary line-clamp-1 min-w-[10%] shrink break-all font-medium">
            @{author.handle}
          </span>
          <span className="text-skin-tertiary whitespace-nowrap font-medium">
            &nbsp;· {getRelativeTime(post.indexedAt)}
          </span>
        </div>
        <p className={`${selectedTextClass} text-skin-base`}>{post.text}</p>
      </div>
    </article>
  );
}
