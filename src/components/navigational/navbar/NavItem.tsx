import Badge from "@/components/feedback/badge/Badge";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface Props {
  href: string;
  title: string;
  icons: string[];
  isActive: boolean;
  badge?: number;
  className?: string;
}

export default function NavItem(props: Props) {
  const { href, title, icons, isActive, badge, className } = props;
  const activeStyle = isActive && "text-neutral-700";
  const activeIcon = isActive ? icons[0] : icons[1];
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-neutral-500 hover:text-neutral-700"
    >
      <div className="relative m-2 md:m-0">
        <Icon
          icon={activeIcon}
          className={`text-2xl md:text-3xl ${activeStyle} ${className}`}
        />
        {badge !== undefined && badge > 0 && (
          <Badge variant="overlay" position="topRight">
            {badge}
          </Badge>
        )}
      </div>
      <span className={`hidden lg:inline text-lg font-medium ${activeStyle}`}>
        {title}
      </span>
    </Link>
  );
}
