import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import { ComposerOptionsQuote } from "@/app/providers/compoter";
import Image from "next/image";
import { getRelativeTime } from "@/lib/utils/time";

interface Props {
  post: ComposerOptionsQuote;
}

export default function QuoteToPreview(props: Props) {
  const { post } = props;
  const { author } = post || {};

  return (
    <article className="flex items-start gap-1 p-2 mb-3 border rounded-2xl">
      <Image
        src={author.avatar ?? FallbackAvatar}
        alt="Avatar"
        width={20}
        height={20}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex gap-1">
          <span className="font-semibold break-all max-w-[90%] shrink-0 line-clamp-1 overflow-ellipsis">
            {author.displayName ?? author.handle}
          </span>
          <span className="text-neutral-400 font-medium line-clamp-1 break-all shrink min-w-[10%]">
            @{author.handle}
          </span>
          <span className="text-neutral-400 font-medium whitespace-nowrap">
            &nbsp;· {getRelativeTime(post.indexedAt)}
          </span>
        </div>

        <p className="line-clamp-3">{post.text}</p>
      </div>
    </article>
  );
}
