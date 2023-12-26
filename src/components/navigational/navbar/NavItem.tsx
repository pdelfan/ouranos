import Badge from "@/components/feedback/badge/Badge";
import Link from "next/link";
import { ReactElement } from "react";

interface Props {
  href: string;
  title: string;
  icon: ReactElement;
  activeIcon: ReactElement;
  isActive: boolean;
  badge?: number;
  className?: string;
}

export default function NavItem(props: Props) {
  const { href, title, icon, activeIcon, isActive, badge, className } = props;
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 ${
        isActive ? "text-neutral-700" : "text-neutral-500"
      } hover:text-neutral-700`}
    >
      <div className="relative m-2 md:m-0">
        {isActive ? activeIcon : icon}
        {badge !== undefined && badge > 0 && (
          <Badge variant="overlay" position="topRight">
            {badge}
          </Badge>
        )}
      </div>
      <span
        className={`hidden lg:inline text-lg font-medium ${
          isActive ? "text-neutral-700" : "text-neutral-500"
        }`}
      >
        {title}
      </span>
    </Link>
  );
}
