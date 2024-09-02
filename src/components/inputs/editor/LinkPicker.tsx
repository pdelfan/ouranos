import type { Editor } from "@tiptap/react";
import Button from "@/components/actions/button/Button";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Input from "../input/Input";
import { BiLink, BiUnlink } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { isValidUrl } from "@/lib/utils/link";

interface Props {
  editor: Editor;
}

export default function LinkPicker(props: Props) {
  const { editor } = props;
  const { selection } = editor.state;
  const [showLinkPicker, setShowLinkPicker] = useState(false);
  const [href, setHref] = useState("");
  const [showError, setShowError] = useState(false);

  const onClose = () => {
    setShowLinkPicker(false);
    setShowError(false);
    editor.commands.focus();
  };

  const onAddLink = (href: string) => {
    if (!isValidUrl(href)) {
      setShowError(true);
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: href })
      .focus()
      .run();

    onClose();
  };

  const onRemoveLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    }
    onClose();
  };

  return (
    <Dialog.Root open={showLinkPicker} onOpenChange={setShowLinkPicker}>
      <Dialog.Trigger>
        <Button
          disabled={!editor.isActive("link") && selection.empty}
          onClick={(e) => {
            e.stopPropagation();
            if (editor.isActive("link")) {
              onRemoveLink();
            } else {
              setShowLinkPicker(true);
              setShowError(false);
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
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-skin-overlay-muted fixed inset-0 z-50" />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog.Content>
            <div className="flex flex-wrap flex-col gap-2 bg-skin-base p-2 border-skin-base border rounded-xl">
              <div className="flex flex-wrap gap-2">
                <Input
                  type="url"
                  placeholder="https://your-link.com"
                  onChange={(e) => {
                    setHref(e.currentTarget.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onAddLink(e.currentTarget.value);
                    }
                  }}
                  onInput={() => setShowError(false)}
                />
              </div>
              {showError && (
                <small className="text-status-danger block font-medium">
                  Invalid URL
                </small>
              )}

              <div className="mt-2 flex justify-end items-center gap-2">
                <Button
                  onClick={onClose}
                  className="hover:bg-skin-secondary border-skin-base text-skin-base rounded-full border px-4 py-2 text-sm font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onAddLink(href);
                  }}
                  className="bg-primary hover:bg-primary-dark text-white rounded-full px-4 py-2 text-sm font-semibold"
                >
                  Add link
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
