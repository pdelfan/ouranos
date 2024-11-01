import Button from "@/components/actions/button/Button";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
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
    <Button
      onClick={(e) => {
        e.stopPropagation();
        onToggleVisibility(hidden ? false : true);
      }}
      className="text-skin-base bg-skin-tertiary flex items-center justify-between gap-2 rounded-lg p-3 font-medium w-full border border-skin-base hover:bg-skin-muted"
    >
      <div className="flex items-center gap-2">
        {hidden ? (
          <MdOutlineVisibilityOff className="text-skin-icon-base shrink-0 text-2xl" />
        ) : (
          <MdOutlineVisibility className="text-skin-icon-base shrink-0 text-2xl" />
        )}
        <span>{message}</span>
      </div>
      {showToggle && (
        <span className="text-skin-base">{hidden ? "Show" : "Hide"}</span>
      )}
    </Button>
  );
}
