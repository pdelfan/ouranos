import * as Dialog from "@radix-ui/react-dialog";
import Button from "@/components/actions/button/Button";
import { UseMutationResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HiOutlineShieldExclamation } from "react-icons/hi";
import { BiLogoTelegram } from "react-icons/bi";
import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
  hasContent: boolean;
  onClose: () => void;
  label: string;
  onRemoveLabel: () => void;
  numberOfImages?: number;
  onPublish: UseMutationResult<void, Error, void, unknown>;
}

export default function TopEditorBar(props: Props) {
  const {
    editor,
    hasContent,
    onClose,
    label,
    onRemoveLabel,
    numberOfImages,
    onPublish,
  } = props;

  const [showCancelModal, setShowCancelModal] = useState(false);

  const onCloseEditor = () => {
    if (hasContent) {
      setShowCancelModal(true);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (numberOfImages === 0 && label !== "") {
      onRemoveLabel();
    }
  }, [numberOfImages, label, onRemoveLabel]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Button
        onClick={onCloseEditor}
        className="hover:bg-skin-secondary border-skin-base text-skin-base rounded-full border px-4 py-2 text-sm font-semibold"
      >
        Cancel
      </Button>

      {label !== "" && (
        <Button
          onClick={onRemoveLabel}
          className="hover:bg-skin-inverted bg-skin-tertiary text-skin-base hover:text-skin-inverted rounded-full px-4 py-2 text-sm font-semibold"
        >
          <HiOutlineShieldExclamation className="text-xl" />
          {label === "nsfw"
            ? "Porn"
            : label.charAt(0).toUpperCase() + label.slice(1)}
        </Button>
      )}
      <Button
        onClick={() => {
          onPublish.mutate(undefined, {
            onSuccess: () => {
              onClose();
            },
          });
        }}
        className={`bg-primary hover:bg-primary-dark rounded-full px-4 py-2 text-sm font-semibold text-white ${
          onPublish.isPending && "animate-pulse"
        }`}
        disabled={onPublish.isPending}
      >
        <BiLogoTelegram className="text-xl" />
        {onPublish.isPending ? "Posting..." : "Post"}
      </Button>
      <Dialog.Root open={showCancelModal} onOpenChange={setShowCancelModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-skin-overlay-muted fixed inset-0 z-50 h-screen w-screen" />
          <Dialog.Content className="bg-skin-base border-skin-base fixed left-[50%] top-[50%] z-50 h-fit max-h-[90svh] w-[90svw] max-w-sm translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-2xl border p-3 shadow-2xl">
            <h2 className="text-skin-base mb-2 text-xl font-semibold">
              Discard Draft
            </h2>
            <p className="text-skin-base">Do you want to discard this draft?</p>
            <div className="mt-2 flex justify-end gap-2">
              <Dialog.Close
                className="text-skin-base border-skin-base hover:bg-skin-secondary rounded-full border px-4 py-2 text-sm font-semibold"
                onClick={() => editor.commands.focus()}
              >
                Cancel
              </Dialog.Close>
              <Button
                className="bg-primary hover:bg-primary-dark text-skin-icon-inverted rounded-full px-4 py-2 text-sm font-semibold"
                onClick={() => {
                  setShowCancelModal(false);
                  onClose();
                }}
              >
                Discard
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
