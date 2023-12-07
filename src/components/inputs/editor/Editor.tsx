import BottomEditorBar from "./BottomEditorBar";
import TextEdit from "./TextEdit";
import TopEditorBar from "./TopEditorBar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";
import { useState } from "react";

interface Props {
  onCancel: () => void;
  isReply?: boolean;
}

export default function Editor(props: Props) {
  const { onCancel, isReply } = props;
  const [label, setLabel] = useState("");
  const [languages, setLanguages] = useState<Language[]>([]);

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
        placeholder: `${isReply ? "Write your reply" : "What's up?"}`,
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-0 before:left-0 before:text-neutral-400 before-pointer-events-none",
      }),
      Paragraph,
      Link.extend({ inclusive: false }).configure({
        autolink: true,
        openOnClick: false,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-primary hover:text-primary-dark",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none h-48 overflow-y-auto",
      },
    },
    autofocus: true,
  });

  if (!editor) return null;

  return (
    <section className="bg-white p-3 bottom-0 z-50 fixed w-full h-full md:h-fit md:border-t shadow-xl rounded-t-3xl animate-fade-up animate-duration-200">
      <div className="mx-auto max-w-2xl">
        <TopEditorBar
          onCancel={onCancel}
          label={label}
          onRemoveLabel={() => setLabel("")}
        />
        <TextEdit editor={editor} />
        <BottomEditorBar
          editor={editor}
          label={label}
          onSelectLabel={setLabel}
          charCount={editor?.storage.characterCount.characters()}
          languages={languages}
          onSelectLanguages={setLanguages}
        />
      </div>
    </section>
  );
}
