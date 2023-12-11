import BottomEditorBar from "./BottomEditorBar";
import TextEdit from "./TextEdit";
import TopEditorBar from "./TopEditorBar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import CharacterCount from "@tiptap/extension-character-count";
import { useState } from "react";
import { CreateMentionSuggestions } from "./CreateMentionSuggestions";
import useSearchUsers from "@/lib/hooks/bsky/actor/useSearchUsers";
import { ComposerOptions } from "@/app/providers/compoter";
import ReplyToPreview from "./ReplyToPreview";
import QuoteToPreview from "./QuotePreview";
import { getComposerPlaceholder } from "@/lib/utils/text";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { detectLinksInEditor } from "@/lib/utils/link";
import LinkCardPrompt from "./LinkCardPrompt";
import LinkCard from "./LinkCard";

interface Props {
  onCancel: () => void;
  options: ComposerOptions | null;
  author: ProfileViewDetailed | null | undefined;
}

export default function Editor(props: Props) {
  const { onCancel, options, author } = props;
  const { replyTo, onPost, quote, mention } = options ?? {};
  const [label, setLabel] = useState("");
  const [languages, setLanguages] = useState<Language[]>([]);
  const [images, setImages] = useState<UploadImage[]>();
  const [embedSuggestions, setEmbedSuggestions] = useState<Set<string>>(
    new Set("")
  );
  const [linkEmbed, setLinkEmbed] = useState("");
  const [linkCard, setLinkCard] = useState<LinkMeta | null>(null);
  const searchUsers = useSearchUsers();
  const replyAuthor = replyTo?.author.displayName ?? replyTo?.author.handle;
  const quoteAuthor = quote?.author.displayName ?? quote?.author.handle;
  const placeholderText = getComposerPlaceholder(
    replyTo ? "reply" : quote ? "quote" : "post",
    replyAuthor ?? quoteAuthor
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        bold: false,
        italic: false,
        code: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        heading: false,
        strike: false,
        listItem: false,
      }),
      CharacterCount.configure({
        limit: 600,
      }),
      Placeholder.configure({
        placeholder: placeholderText,
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-0 before:left-0 before:text-neutral-400 before-pointer-events-none text-lg",
      }),
      Link.extend({ inclusive: false }).configure({
        autolink: true,
        openOnClick: false,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-primary hover:text-primary-dark text-lg",
        },
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "text-primary text-lg",
        },
        // TODO: Clean this up
        suggestion: CreateMentionSuggestions({ autoComplete: searchUsers }),
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none h-48 overflow-y-auto text-lg",
      },
    },
    autofocus: true,
    onUpdate: ({ editor }) => {
      setEmbedSuggestions(detectLinksInEditor(editor.getJSON()));
    },
  });

  if (!editor) return null;

  return (
    <section className="bg-white p-3 bottom-0 z-50 fixed w-full h-full md:max-h-[80svh] md:h-fit md:border-t shadow-2xl rounded-t-3xl overflow-auto animate-fade-up animate-duration-200">
      <div className="mx-auto max-w-2xl">
        <TopEditorBar
          onCancel={onCancel}
          label={label}
          onRemoveLabel={() => setLabel("")}
          numberOfImages={images?.length ?? 0}
        />
        {replyTo && <ReplyToPreview post={replyTo} />}
        <TextEdit
          editor={editor}
          author={author}
          isReply={replyAuthor ? true : false}
        />
        <div className="mb-3">
          {quote && <QuoteToPreview post={quote} />}
          {embedSuggestions.size > 0 && (
            <div className="flex flex-col gap-y-3 mb-3">
              {Array.from(embedSuggestions).map((link) => (
                <LinkCardPrompt
                  key={link}
                  link={link}
                  onAddLinkCard={() => {
                    setLinkEmbed(link);
                    setEmbedSuggestions(new Set(""));
                  }}
                />
              ))}
            </div>
          )}
          {linkEmbed !== "" && (
            <LinkCard
              link={linkEmbed}
              onRemoveLinkCard={() => {
                setLinkEmbed("");
                setLinkCard(null);
              }}
              onAddLinkCard={setLinkCard}
            />
          )}
        </div>
        <BottomEditorBar
          editor={editor}
          label={label}
          onSelectLabel={setLabel}
          charCount={editor?.storage.characterCount.characters()}
          languages={languages}
          onSelectLanguages={setLanguages}
          images={images}
          onUpdateImages={setImages}
        />
      </div>
    </section>
  );
}
