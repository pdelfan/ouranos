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
      {!showCancelModal && (
        <>
          {" "}
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
            className={`bg-primary hover:bg-primary-dark rounded-full px-4 py-2 gap-2 text-sm font-semibold text-white ${
              onPublish.isPending && "animate-pulse animate-duration-1000"
            }`}
            disabled={onPublish.isPending || !hasContent}
          >
            <BiLogoTelegram className="text-xl" />
            {onPublish.isPending ? "Sending..." : "Send"}
          </Button>
        </>
      )}
      {showCancelModal && (
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 w-full">
          <h2 className="text-skin-base text-lg font-medium">
            Discard this draft?
          </h2>
          <div className="flex justify-end gap-2">
            <Button
              className="text-skin-base border-skin-base hover:bg-skin-secondary rounded-full border px-4 py-2 text-sm font-semibold"
              onClick={() => {
                setShowCancelModal(false);
                editor.commands.focus();
              }}
            >
              Go back
            </Button>
            <Button
              className="bg-primary hover:bg-primary-dark rounded-full px-4 py-2 text-sm font-semibold text-white"
              onClick={() => {
                setShowCancelModal(false);
                onClose();
              }}
            >
              Discard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
