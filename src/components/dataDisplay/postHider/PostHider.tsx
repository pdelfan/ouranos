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
    <div className="text-skin-base bg-skin-tertiary flex items-center justify-between gap-2 rounded-lg p-3 font-medium">
      <div className="flex items-center gap-2">
        <MdOutlineVisibilityOff className="text-skin-icon-base shrink-0 text-2xl" />
        <span>{message}</span>
      </div>
      {showToggle && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility(hidden ? false : true);
          }}
          className="bg-skin-base rounded-lg border px-2 py-1 hover:brightness-95"
        >
          {hidden ? "Show" : "Hide"}
        </Button>
      )}
    </div>
  );
}
