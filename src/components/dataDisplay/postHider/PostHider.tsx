import Button from "@/components/actions/button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dispatch, SetStateAction } from "react";

interface Props {
  message: string;
  hidden: boolean;
  onToggleVisibility: Dispatch<SetStateAction<boolean>>;
  showToggle: boolean;
}

export default function PostHider(props: Props) {
  const { message, hidden, onToggleVisibility, showToggle } = props;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-100 p-3 rounded-lg font-medium text-neutral-600">
      <div className="flex gap-2">
        <Icon icon="material-symbols:no-adult-content" className="text-2xl" />
        <span>{message}</span>
      </div>
      {showToggle && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility(hidden ? false : true);
          }}
          className="bg-white border px-2 py-1 rounded-lg hover:brightness-95"
        >
          {hidden ? "Show" : "Hide"}
        </Button>
      )}
    </div>
  );
}
