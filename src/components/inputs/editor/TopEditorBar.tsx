import Button from "@/components/actions/button/Button";
import { UseMutationResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { HiOutlineShieldExclamation } from "react-icons/hi";
import { BiLogoTelegram } from "react-icons/bi";

interface Props {
  onClose: () => void;
  label: string;
  onRemoveLabel: () => void;
  numberOfImages?: number;
  onPublish: UseMutationResult<void, Error, void, unknown>;
}

export default function TopEditorBar(props: Props) {
  const { onClose, label, onRemoveLabel, numberOfImages, onPublish } = props;

  useEffect(() => {
    if (numberOfImages === 0 && label !== "") {
      onRemoveLabel();
    }
  }, [numberOfImages, label, onRemoveLabel]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Button
        onClick={onClose}
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
    </div>
  );
}
