import { EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
}

export default function TextEdit(props: Props) {
  const { editor } = props;

  return (
    <div className="my-5">
      <EditorContent editor={editor} />
    </div>
  );
}
