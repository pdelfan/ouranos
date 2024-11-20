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
import { ComposerOptions } from "@/app/providers/composer";
import ReplyToPreview from "./ReplyToPreview";
import QuoteToPreview from "./QuotePreview";
import { getComposerPlaceholder, jsonToText } from "@/lib/utils/text";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { detectLinksInEditor } from "@/lib/utils/link";
import LinkCardPrompt from "./LinkCardPrompt";
import LinkCard from "./LinkCard";
import usePublishPost from "@/lib/hooks/bsky/feed/usePublishPost";
import { ThreadgateSetting } from "../../../../types/feed";
import { RichText } from "@atproto/api";
import UploadPreview from "./UploadPreview";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import PostTag from "@/components/dataDisplay/postTag/PostTag";

interface Props {
  onCancel: () => void;
  options: ComposerOptions | null;
  author: ProfileViewDetailed | null | undefined;
}

export default function Editor(props: Props) {
  const { onCancel, options, author } = props;
  const { replyTo, quote, mention } = options ?? {};
  const [label, setLabel] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [threadGate, setThreadGate] = useState<ThreadgateSetting[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [images, setImages] = useState<UploadImage[]>();
  const [embedSuggestions, setEmbedSuggestions] = useState<Set<string>>(
    new Set("")
  );
  const [linkEmbed, setLinkEmbed] = useState("");
  const [linkCard, setLinkCard] = useState<LinkMeta | null>(null);
  const searchUsers = useSearchUsers({ authorHandle: author?.handle });
  const replyAuthor = replyTo?.author.displayName || replyTo?.author.handle;
  const quoteAuthor = quote?.author.displayName || quote?.author.handle;
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
          "cursor-text caret-primary before:content-[attr(data-placeholder)] before:absolute before:top-0 before:left-0 before:text-skin-tertiary before-pointer-events-none text-lg",
      }),
      Link.extend({ inclusive: false }).configure({
        autolink: true,
        openOnClick: false,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-skin-link-base hover:text-skin-link-hover text-lg",
        },
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "text-skin-link-base text-lg",
        },
        suggestion: CreateMentionSuggestions({ autoComplete: searchUsers }),
      }),
    ],
    autofocus: true,
    editorProps: {
      attributes: {
        class: "focus:outline-none overflow-y-auto text-lg text-skin-base",
      },
    },
    onUpdate: ({ editor }) => {
      setEmbedSuggestions(detectLinksInEditor(editor.getJSON()));
    },
    onCreate: ({ editor }) => {
      if (mention && editor.isEmpty) {
        editor.commands.insertContent({
          type: "mention",
          attrs: {
            id: mention,
            label: mention,
          },
        });
        const transaction = editor.state.tr.insertText(" ");
        editor.view.dispatch(transaction);
      }
    },
  });

  const richText = new RichText({
    text: jsonToText(editor?.getJSON() ?? {}),
  });

  const hasContent =
    quote ||
    (images && images.length > 0) ||
    linkEmbed ||
    richText.graphemeLength !== 0
      ? true
      : false;

  const sendPost = usePublishPost({
    text: editor?.getJSON() ?? {},
    linkCard,
    replyTo,
    quote,
    languages: languages.map((lang) => lang.code),
    tags,
    images,
    label,
    threadGate,
  });

  if (!editor) return null;

  return (
    <section className="border-skin-base animate-fade-up animate-duration-200 bg-skin-base fixed bottom-0 z-50 h-full w-full overflow-auto rounded-t-3xl p-3 shadow-2xl md:h-auto md:max-h-[80svh] md:border-t">
      <div className="flex flex-col h-full mx-auto max-w-2xl">
        <TopEditorBar
          editor={editor}
          hasContent={hasContent}
          onClose={onCancel}
          onPublish={sendPost}
          label={label}
          onRemoveLabel={() => setLabel("")}
          numberOfImages={images?.length ?? 0}
        />

        <ScrollArea.Root className="max-h-[80svh] md:h-[30svh]  my-3 bg-skin-secondary p-3 rounded-2xl overflow-auto">
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>

          {replyTo && <ReplyToPreview post={replyTo} />}
          <TextEdit
            editor={editor}
            author={author}
            isReply={replyAuthor ? true : false}
          />
          <div
            className={`${
              quote ||
              linkEmbed ||
              tags.length > 0 ||
              (images && images.length > 0) ||
              embedSuggestions.size > 0
                ? "my-3"
                : ""
            }`}
          >
            {quote && <QuoteToPreview post={quote} />}
            {embedSuggestions.size > 0 && (
              <div className="my-3 flex flex-col gap-y-3">
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
            {images && images.length > 0 && (
              <div className="my-4">
                <UploadPreview
                  images={images.slice(0, 4)}
                  onUpdate={setImages}
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <PostTag
                  key={i}
                  tag={t}
                  onRemove={() => {
                    setTags((prev) => prev.filter((_, index) => index !== i));
                  }}
                />
              ))}
            </div>
          </div>
        </ScrollArea.Root>
        <section className="mt-auto mb-6 md:mb-0">
          <BottomEditorBar
            editor={editor}
            label={label}
            onSelectLabel={setLabel}
            tags={tags}
            onUpdateTags={setTags}
            text={editor.getJSON()}
            languages={languages}
            onSelectLanguages={setLanguages}
            threadGate={threadGate}
            onUpdateThreadGate={setThreadGate}
            images={images}
            onUpdateImages={setImages}
          />
        </section>
      </div>
    </section>
  );
}
