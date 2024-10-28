import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import { ComposerOptionsPostRef } from "@/app/providers/composer";
import Image from "next/image";
import { useState } from "react";
import Threadline from "@/components/dataDisplay/threadLine/ThreadLine";

interface Props {
  post: ComposerOptionsPostRef;
}

export default function ReplyToPreview(props: Props) {
  const { post } = props;
  const { author } = post || {};
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const selectedTextClass = showMore
    ? "max-h-56 overflow-auto"
    : "line-clamp-3";

  return (
    <article
      onClick={toggleShowMore}
      className="relative flex cursor-pointer items-start gap-3 rounded-2xl p-2"
    >
      <Threadline className="left-8" />
      <Image
        src={
          author.avatar?.replace("avatar", "avatar_thumbnail") ?? FallbackAvatar
        }
        alt="Avatar"
        width={50}
        height={50}
        className="z-50 rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex gap-1">
          <span className="text-skin-base line-clamp-1 max-w-[90%] shrink-0 overflow-ellipsis break-all font-semibold">
            {author.displayName || author.handle}
          </span>
          <span className="text-skin-tertiary line-clamp-1 min-w-[10%] shrink break-all font-medium">
            @{author.handle}
          </span>
        </div>
        <p className={`${selectedTextClass} text-skin-base`}>{post.text}</p>
      </div>
    </article>
  );
}
