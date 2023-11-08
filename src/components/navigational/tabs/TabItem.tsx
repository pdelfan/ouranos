"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  label: string;
  path: string;
}

export default function TabItem(props: Props) {
  const { label, path } = props;
  const pathname = usePathname();
  const isAvtive = pathname === path;

  return (
    <Link
      href={path}
      role="tab"
      className={`shrink-0 border-b-3 px-3 pb-2 font-semibold ${
        isAvtive
          ? "border-primary-600 text-primary border-primary"
          : "border-transparent text-neutral-500"
      }`}
    >
      {label}
    </Link>
  );
}
