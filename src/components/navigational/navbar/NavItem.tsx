import Badge from "@/components/feedback/badge/Badge";
import Link from "next/link";
import { ReactElement } from "react";

interface Props {
  href: string;
  icon: ReactElement;
  title?: string;
  activeIcon?: ReactElement;
  isActive?: boolean;
  badge?: number;
}

export default function NavItem(props: Props) {
  const { href, title, icon, activeIcon, isActive, badge } = props;
  return (
    <Link
      href={href}
      className={`hover:text-skin-base flex items-center ${
        isActive ? "text-skin-base" : "text-skin-secondary"
      } ${title && "gap-3"}`}
    >
      <div className="relative m-2 md:m-0">
        {isActive ? activeIcon : icon}
        {badge !== undefined && badge > 0 && (
          <Badge variant="overlay" position="topRight">
            {badge}
          </Badge>
        )}
      </div>
      <span className={`hidden text-lg font-medium lg:inline`}>{title}</span>
    </Link>
  );
}
