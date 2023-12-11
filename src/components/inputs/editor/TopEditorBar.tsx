import Button from "@/components/actions/button/Button";
import { useEffect } from "react";

interface Props {
  onCancel: () => void;
  label: string;
  onRemoveLabel: () => void;
  numberOfImages?: number;
}

export default function TopEditorBar(props: Props) {
  const { onCancel, label, onRemoveLabel, numberOfImages } = props;

  useEffect(() => {
    if (numberOfImages === 0 && label !== "") {
      onRemoveLabel();
    }
  }, [numberOfImages, label, onRemoveLabel]);

  return (
    <div className="flex flex-wrap justify-between items-center gap-2">
      <Button
        onClick={onCancel}
        className="px-4 py-2 text-sm font-semibold border rounded-full hover:bg-neutral-50"
      >
        Cancel
      </Button>

      {label !== "" && (
        <Button
          onClick={onRemoveLabel}
          icon="octicon:shield-16"
          className="px-4 py-2 rounded-full text-sm text-neutral-600 font-semibold bg-neutral-100 hover:bg-neutral-600 hover:text-neutral-100"
        >
          {label === "nsfw"
            ? "Porn"
            : label.charAt(0).toUpperCase() + label.slice(1)}
        </Button>
      )}
      <Button className="bg-primary text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-primary-dark">
        Post
      </Button>
    </div>
  );
}
