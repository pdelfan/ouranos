import { Icon } from "@iconify/react";
import Link from "next/link";

interface Props {
  href: string;
  title: string;
  icons: string[];
  isActive: boolean;
}

export default function NavItem(props: Props) {
  const { href, title, icons, isActive } = props;
  const activeStyle = isActive && "text-neutral-600";
  const activeIcon = isActive ? icons[0] : icons[1];
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-neutral-400 hover:text-neutral-700"
    >
      <Icon icon={activeIcon} className={`text-3xl ${activeStyle}`} />
      <span className={`hidden lg:inline text-lg font-medium ${activeStyle}`}>
        {title}
      </span>
    </Link>
  );
}
