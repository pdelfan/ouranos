"use client";

import { NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  label: string;
  icon: React.ReactElement;
  activeIcon: React.ReactElement;
  badge?: number;
}

export default function NavItem(props: Props) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <NavLink
      component={Link}
      href={props.href}
      variant="subtle"
      c="gray"
      px={"6"}
      label={props.label}
      leftSection={isActive ? props.activeIcon : props.icon}
    />
  );
}
