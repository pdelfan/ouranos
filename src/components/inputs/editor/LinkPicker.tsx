import type { Editor } from "@tiptap/react";
import Button from "@/components/actions/button/Button";

interface Props {
  editor: Editor;
}

export default function LinkPicker(props: Props) {
  const { editor } = props;

  const onLinkAdd = (href: string) => {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href })
      .focus()
      .run();
  };

  const onLinkRemove = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          if (editor.isActive("link")) {
            onLinkRemove();
          } else {
            const href = window.prompt("URL");

            if (href) {
              onLinkAdd(href);
            }
          }
        }}
        icon={editor.isActive("link") ? "bx:unlink" : "bx:link"}
        iconColor="text-primary hover:text-primary-dark"
        iconSize="text-2xl"
        className="p-0"
      />
    </div>
  );
}
