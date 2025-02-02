import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Divider,
  Group,
  Paper,
  Text,
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

  return (
    <Paper
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        zIndex: 1000000,
      }}
      radius={"0"}
      mb={"md"}
    >
      <Group p={"sm"} justify="space-between">
        <Group>
          {showBackButton && (
            <ActionIcon
              variant="light"
              color="gray"
              radius={"xl"}
              component="a"
              href="./"
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
