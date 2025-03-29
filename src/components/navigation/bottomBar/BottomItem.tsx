"use client";

import { ActionIcon } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href?: string;
  icon: React.ReactElement;
  activeIcon?: React.ReactElement;
  badge?: number;
  onClick?: () => void;
}

export default function BottomItem(props: Props) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  if (props.href) {
    return (
      <ActionIcon
        component={Link}
        href={props.href}
        variant="subtle"
        color="gray"
        radius={"xl"}
        mx={"xs"}
        mb={"xl"}
        mt={"sm"}
        size={"md"}
      >
        {isActive && props.activeIcon ? props.activeIcon : props.icon}
      </ActionIcon>
    );
  }

  return (
    <ActionIcon
      onClick={props.onClick}
      variant="subtle"
      color="gray"
      radius={"xl"}
      mx={"xs"}
      mb={"xl"}
      mt={"sm"}
      size={"md"}
    >
      {props.icon}
    </ActionIcon>
  );
}
