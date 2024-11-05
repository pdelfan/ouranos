import Button from "@/components/actions/button/Button";
import Link from "next/link";
import { BiHash } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

interface Props {
  tag: string;
  onRemove?: () => void;
}

export default function PostTag(props: Props) {
  const { tag, onRemove } = props;

  const encodedTag = encodeURIComponent(tag);

  if (onRemove) {
    return (
      <Button
        onClick={onRemove}
        className="flex flex-wrap gap-2 items-center bg-skin-base border border-skin-base px-3 py-1.5 rounded-lg text-sm text-skin-secondary font-medium hover:text-skin-base break-all"
      >
        <div className="flex flex-wrap items-center">
          <BiHash />
          {tag}
        </div>
        <CgClose className="text-lg text-skin-tertiary" />
      </Button>
    );
  }

  return (
    <Link
      href={`/dashboard/search?query=%23${encodedTag}`}
      className="flex flex-wrap items-center bg-skin-base border border-skin-base px-3 py-1.5 rounded-lg text-sm text-skin-secondary font-medium hover:text-skin-base break-all"
      onClick={(e) => e.stopPropagation()}
    >
      <BiHash />
      {tag}
    </Link>
  );
}
