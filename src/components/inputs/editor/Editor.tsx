import * as Dialog from "@radix-ui/react-dialog";
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
import Button from "@/components/actions/button/Button";

interface Props {
  onCancel: () => void;
  options: ComposerOptions | null;
  author: ProfileViewDetailed | null | undefined;
}

export default function Editor(props: Props) {
  const { onCancel, options, author } = props;
  const { replyTo, quote, mention } = options ?? {};
  const [label, setLabel] = useState("");
  const [threadGate, setThreadGate] = useState<ThreadgateSetting[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [images, setImages] = useState<UploadImage[]>();
  const [embedSuggestions, setEmbedSuggestions] = useState<Set<string>>(
    new Set(""),
  );
  const [linkEmbed, setLinkEmbed] = useState("");
  const [linkCard, setLinkCard] = useState<LinkMeta | null>(null);
  const searchUsers = useSearchUsers({ authorHandle: author?.handle });
  const replyAuthor = replyTo?.author.displayName || replyTo?.author.handle;
  const quoteAuthor = quote?.author.displayName || quote?.author.handle;
  const placeholderText = getComposerPlaceholder(
    replyTo ? "reply" : quote ? "quote" : "post",
    replyAuthor ?? quoteAuthor,
  );
  const [showCancelModal, setShowCancelModal] = useState(false);

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
        class: "focus:outline-none h-48 overflow-y-auto text-lg text-skin-base",
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
      }
    },
  });

  const onCloseEditor = () => {
    const richText = new RichText({
      text: jsonToText(editor?.getJSON() ?? {}),
    });
    const hasText = richText.graphemeLength !== 0;

    if (images || linkEmbed || hasText) {
      setShowCancelModal(true);
    } else {
      onCancel();
    }
  };

  const sendPost = usePublishPost({
    text: editor?.getJSON() ?? {},
    linkCard,
    replyTo,
    quote,
    languages: languages.map((lang) => lang.code),
    images,
    label,
    threadGate,
  });

  if (!editor) return null;

  return (
    <section className="border-skin-base animate-fade-up animate-duration-200 bg-skin-base fixed bottom-0 z-50 h-full w-full overflow-auto rounded-t-3xl p-3 shadow-2xl md:h-fit md:max-h-[80svh] md:border-t">
      <div className="mx-auto max-w-2xl">
        <TopEditorBar
          onClose={onCloseEditor}
          onPublish={sendPost}
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
            <div className="mb-3 flex flex-col gap-y-3">
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
          text={editor.getJSON()}
          languages={languages}
          onSelectLanguages={setLanguages}
          threadGate={threadGate}
          onUpdateThreadGate={setThreadGate}
          images={images}
          onUpdateImages={setImages}
        />
      </div>
      <Dialog.Root open={showCancelModal} onOpenChange={setShowCancelModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-skin-overlay-muted fixed inset-0 z-50 h-screen w-screen" />
          <Dialog.Content className="bg-skin-base fixed left-[50%] top-[50%] z-50 h-fit max-h-[90svh] w-[90svw] max-w-sm translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-2xl p-3 shadow-2xl">
            <h2 className="text-skin-base mb-2 text-xl font-semibold">
              Discard Draft
            </h2>
            <p className="text-skin-base">Do you want to discard this draft?</p>
            <div className="mt-2 flex justify-end gap-2">
              <Dialog.Close className="text-skin-base border-skin-base hover:bg-skin-secondary rounded-full border px-4 py-2 text-sm font-semibold">
                Cancel
              </Dialog.Close>
              <Button
                className="bg-primary hover:bg-primary-dark text-skin-icon-inverted rounded-full px-4 py-2 text-sm font-semibold"
                onClick={() => {
                  setShowCancelModal(false);
                  onCancel();
                }}
              >
                Discard
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
