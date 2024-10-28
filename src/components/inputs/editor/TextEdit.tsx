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
    <div>
      <div className={`flex gap-3 ${isReply && "mt-3"}`}>
        <Image
          src={
            author?.avatar?.replace("avatar", "avatar_thumbnail") ??
            FallbackAvatar
          }
          alt="Avatar"
          width={50}
          height={50}
          className={`z-50 mb-2 rounded-full ${isReply && "ml-2"}`}
        />
        <div className="flex flex-col">
          <span className="text-skin-base line-clamp-1 shrink-0 overflow-ellipsis break-all font-semibold">
            {author?.displayName || author?.handle}
          </span>
          <span className="text-skin-tertiary line-clamp-1 min-w-[10%] shrink break-all font-medium">
            {author?.handle}
          </span>
        </div>
      </div>
      <EditorContent className={`mt-1 ${isReply && "ml-2"}`} editor={editor} />
    </div>
  );
}
