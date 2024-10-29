import Link from "next/link";

interface Props {
  tag: string;
}

export default function PostTag(props: Props) {
  const { tag } = props;

  const encodedTag = encodeURIComponent(tag);

  return (
    <Link
      href={`/dashboard/search?query=%23${encodedTag}`}
      className="bg-skin-tertiary px-3 py-1.5 rounded-lg text-sm text-skin-secondary font-medium hover:text-skin-base break-all"
      onClick={(e) => e.stopPropagation()}
    >
      #{tag}
    </Link>
  );
}
