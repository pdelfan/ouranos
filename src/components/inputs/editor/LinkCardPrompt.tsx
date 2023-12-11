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
      className="flex items-center gap-3 border p-3 rounded-2xl w-full"
    >
      <span className="w-fit shrink-0">Add link card:</span>
      <span className="shrink text-primary text-sm break-all line-clamp-1 overflow-ellipsis">
        {link}
      </span>
    </button>
  );
}
