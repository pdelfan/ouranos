"use client";

import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Divider,
  Group,
  Paper,
} from "@mantine/core";
import { BiLeftArrowAlt } from "react-icons/bi";

type BreadCrumbs = {
  label: string;
  href: string;
};

interface Props {
  breadcrumbs: BreadCrumbs[];
  actions?: React.ReactNode;
}

export default function TopBar(props: Props) {
  const showBackButton = props.breadcrumbs.length > 1;
  const onNavigateBack = () => {
    if (document.referrer) {
      window.history.back();
    } else {
      // no previous page, navigate to home
      window.location.href = "/dashboard";
    }
  };

  return (
    <Paper
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <Group p={"sm"} justify="space-between">
        <Group>
          {showBackButton && (
            <ActionIcon
              variant="light"
              color="gray"
              radius={"xl"}
              onClick={onNavigateBack}
            >
              <BiLeftArrowAlt />
            </ActionIcon>
          )}
          <Breadcrumbs>
            {props.breadcrumbs.map((b, i) => (
              <Anchor key={i} href={b.href} fz={"sm"} fw={600} c={"gray"}>
                {b.label}
              </Anchor>
            ))}
          </Breadcrumbs>
        </Group>
        {props.actions}
      </Group>
      <Divider />
    </Paper>
  );
}
