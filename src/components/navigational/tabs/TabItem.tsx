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
      className={`inline-block shrink-0 border-b-3 p-3 first:ml-3 last:mr-3 font-semibold hover:text-primary ${
        isActive
          ? "border-primary-600 text-primary border-primary"
          : "border-transparent text-neutral-500"
      }`}
    >
      {label}
    </Link>
  );
}
