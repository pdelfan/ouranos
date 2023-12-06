import BottomEditorBar from "./BottomEditorBar";
import TextEdit from "./TextEdit";
import TopEditorBar from "./TopEditorBar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useState } from "react";

interface Props {
  onCancel: () => void;
  isReply?: boolean;
}

export default function Editor(props: Props) {
  const { onCancel, isReply } = props;
  const [label, setLabel] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: 600,
      }),
      Placeholder.configure({
        placeholder: `${isReply ? "Write your reply" : "What's up?"}`,
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
    <section className="bg-white p-3 bottom-0 z-50 fixed w-full h-full md:h-fit md:border-t shadow-xl rounded-t-3xl">
      <div className="mx-auto max-w-2xl">
        <TopEditorBar onCancel={onCancel} label={label} />
        <TextEdit editor={editor} />
        <BottomEditorBar
          editor={editor}
          label={label}
          onSelectLabel={setLabel}
          charCount={editor?.storage.characterCount.characters()}
        />
      </div>
    </section>
  );
}
