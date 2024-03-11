import { Dispatch, SetStateAction } from "react";

interface Props {
  link: string;
  onAddLinkCard: Dispatch<SetStateAction<string>>;
}

export default function LinkCardPrompt(props: Props) {
  const { link, onAddLinkCard } = props;

  return (
    <button
      onClick={() => onAddLinkCard(link)}
      className="border-skin-base flex w-full items-center gap-3 rounded-2xl border p-3"
    >
      <span className="text-skin-base w-fit shrink-0">Add link card:</span>
      <span className="text-primary line-clamp-1 shrink overflow-ellipsis break-all text-sm">
        {link}
      </span>
    </button>
  );
}
