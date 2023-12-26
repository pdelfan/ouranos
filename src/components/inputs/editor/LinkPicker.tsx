import type { Editor } from "@tiptap/react";
import Button from "@/components/actions/button/Button";
import { useState } from "react";
import Popover from "@/components/actions/popover/Popover";
import Input from "../input/Input";
import { BiLink, BiUnlink } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";

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
      .setLink({ href: href })
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
          onClick={(e) => {
            e.stopPropagation();
            if (editor.isActive("link")) {
              setShowLinkPicker(false);
              onLinkRemove();
            } else {
              setShowLinkPicker(true);
            }
          }}
          className="p-0"
        >
          {editor.isActive("link") ? (
            <BiUnlink className="text-2xl text-primary hover:text-primary-dark" />
          ) : (
            <BiLink className="text-2xl text-primary hover:text-primary-dark" />
          )}
        </Button>
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
                  setShowLinkPicker(false);
                }
              }}
            />
            <Button
              onClick={() => {
                if (editor.isActive("link")) {
                  setShowLinkPicker(false);
                }
                onLinkAdd(href);
              }}
              className="bg-primary text-white p-3 rounded-lg hover:bg-primary-dark"
            >
              <BiPlus className="text-lg" />
            </Button>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
