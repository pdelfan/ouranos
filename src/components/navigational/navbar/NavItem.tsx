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
      className={`hover:text-skin-base flex items-center gap-3  ${
        isActive ? "text-skin-base" : "text-skin-secondary"
      }`}
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
        className={`hover:text-skin-base hidden text-lg font-medium lg:inline ${
          isActive ? "text-skin-base" : "text-skin-secondary"
        }`}
      >
        {title}
      </span>
    </Link>
  );
}
