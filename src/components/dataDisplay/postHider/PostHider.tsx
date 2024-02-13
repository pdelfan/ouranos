import Button from "@/components/actions/button/Button";
import { MdOutlineVisibilityOff } from "react-icons/md";
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
    <div className="flex items-center justify-between gap-2 rounded-lg bg-neutral-100 p-3 font-medium text-neutral-600">
      <div className="flex items-center gap-2">
        <MdOutlineVisibilityOff className="shrink-0 text-2xl" />
        <span>{message}</span>
      </div>
      {showToggle && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility(hidden ? false : true);
          }}
          className="rounded-lg border bg-white px-2 py-1 hover:brightness-95"
        >
          {hidden ? "Show" : "Hide"}
        </Button>
      )}
    </div>
  );
}
