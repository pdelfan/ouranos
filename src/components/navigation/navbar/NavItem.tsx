"use client";

import { Button } from "@mantine/core";
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
    <Button
      component="a"
      href={props.href}
      variant="subtle"
      color="gray"
      size="md"
      fullWidth
      justify="start"
      px={"6"}
      leftSection={isActive ? props.activeIcon : props.icon}
    >
      {props.label}
    </Button>
  );
}
