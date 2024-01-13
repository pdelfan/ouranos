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
      className="flex items-start gap-1 p-2 border rounded-2xl cursor-pointer"
    >
      <Image
        src={author.avatar ?? FallbackAvatar}
        alt="Avatar"
        width={20}
        height={20}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex gap-1">
          <span className="font-semibold break-all max-w-[90%] shrink-0 line-clamp-1 overflow-ellipsis text-neutral-700">
            {author.displayName ?? author.handle}
          </span>
          <span className="text-neutral-400 font-medium line-clamp-1 break-all shrink min-w-[10%]">
            @{author.handle}
          </span>
          <span className="text-neutral-400 font-medium whitespace-nowrap">
            &nbsp;· {getRelativeTime(post.indexedAt)}
          </span>
        </div>
        <p className={selectedTextClass}>{post.text}</p>
      </div>
    </article>
  );
}
