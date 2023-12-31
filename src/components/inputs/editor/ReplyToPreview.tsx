import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import { ComposerOptionsPostRef } from "@/app/providers/composer";
import Image from "next/image";

interface Props {
  post: ComposerOptionsPostRef;
}

export default function ReplyToPreview(props: Props) {
  const { post } = props;
  const { author } = post || {};

  return (
    <article className="flex items-start gap-3 p-2 mt-3  rounded-2xl relative">
      <div className="absolute left-8 top-0 mt-5 z-10 h-full border-l-2" />
      <Image
        src={author.avatar ?? FallbackAvatar}
        alt="Avatar"
        width={50}
        height={50}
        className="rounded-full z-50"
      />
      <div className="flex flex-col">
        <div className="flex gap-1">
          <span className="font-semibold break-all max-w-[90%] shrink-0 line-clamp-1 overflow-ellipsis text-neutral-700">
            {author.displayName ?? author.handle}
          </span>
          <span className="text-neutral-400 font-medium line-clamp-1 break-all shrink min-w-[10%]">
            @{author.handle}
          </span>
        </div>
        <p className="max-h-48 overflow-auto">{post.text}</p>
      </div>
    </article>
  );
}
