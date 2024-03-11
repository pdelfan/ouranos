import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface Props {
  label: string;
  path?: string | Url;
  isActive: boolean;
  asButton?: boolean;
  onClick?: () => void;
}

export default function TabItem(props: Props) {
  const { label, path, isActive, asButton, onClick } = props;

  if (asButton) {
    return (
      <button
        onClick={onClick}
        role="tab"
        aria-selected={isActive}
        className={`border-b-3 hover:text-primary inline-block shrink-0 p-3 font-semibold first:ml-3 last:mr-3 ${
          isActive
            ? "text-primary border-primary"
            : "text-skin-secondary border-transparent"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <Link
      href={path ?? ""}
      role="tab"
      aria-selected={isActive}
      className={`border-b-3 hover:text-primary inline-block shrink-0 p-3 font-semibold first:ml-3 last:mr-3 ${
        isActive
          ? "border-primary text-primary"
          : "text-skin-secondary border-transparent"
      }`}
    >
      {label}
    </Link>
  );
}
