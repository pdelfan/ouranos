import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface Props {
  label: string;
  path: string | Url;
  isActive: boolean;
}

export default function TabItem(props: Props) {
  const { label, path, isActive } = props;

  return (
    <Link
      href={path}
      role="tab"
      className={`shrink-0 border-b-3 px-3 py-2 font-semibold hover:text-primary ${
        isActive
          ? "border-primary-600 text-primary border-primary"
          : "border-transparent text-neutral-500"
      }`}
    >
      {label}
    </Link>
  );
}
