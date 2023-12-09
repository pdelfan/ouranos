import Image from "next/image";
import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import { EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/react";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

interface Props {
  editor: Editor;
  author: ProfileViewDetailed | null | undefined;
  isReply: boolean;
}

export default function TextEdit(props: Props) {
  const { editor, author, isReply } = props;

  return (
    <div className="my-5">
      <div className="flex gap-3">
        <Image
          src={author?.avatar ?? FallbackAvatar}
          alt="Avatar"
          width={50}
          height={50}
          className={`rounded-full z-50 mb-2 ${isReply && "ml-2"}`}
        />
        <div className="flex flex-col">
          <span className="font-semibold break-all max-w-[90%] shrink-0 line-clamp-1 overflow-ellipsis hover:text-neutral-600">
            {author?.displayName ?? author?.handle}
          </span>
          <span className="text-neutral-400 font-medium line-clamp-1 break-all shrink min-w-[10%]">
            {author?.handle}
          </span>
        </div>
      </div>
      <EditorContent className={`mt-1 ${isReply && "ml-2"}`} editor={editor} />
    </div>
  );
}
