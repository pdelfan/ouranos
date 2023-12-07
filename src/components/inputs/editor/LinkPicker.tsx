import type { Editor } from "@tiptap/react";
import Button from "@/components/actions/button/Button";
import { useState } from "react";
import Popover from "@/components/actions/popover/Popover";
import Input from "../input/Input";

interface Props {
  editor: Editor;
}

export default function LinkPicker(props: Props) {
  const { editor } = props;
  const { selection } = editor.state;
  const [showLinkPicker, setShowLinkPicker] = useState(false);
  const [href, setHref] = useState("");

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
    <Popover>
      <Popover.Trigger>
        <Button
          disabled={!editor.isActive("link") && selection.empty}
          onClick={() => {
            if (editor.isActive("link")) {
              setShowLinkPicker(false);
              onLinkRemove();
              return;
            }

            setShowLinkPicker(true);
          }}
          icon={editor.isActive("link") ? "bx:unlink" : "bx:link"}
          iconColor="text-primary hover:text-primary-dark"
          iconSize="text-2xl"
          className="p-0"
        />
      </Popover.Trigger>
      <Popover.Content>
        {showLinkPicker && (
          <div className="flex gap-2">
            <Input
              placeholder="https://your-link.com"
              onChange={(e) => setHref(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onLinkAdd(e.currentTarget.value);
                }
              }}
            />
            <Button
              onClick={() => {
                onLinkAdd(href);
              }}
              icon="bx:plus"
              className="bg-primary text-white p-3 rounded-lg hover:bg-primary-dark"
            />
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
