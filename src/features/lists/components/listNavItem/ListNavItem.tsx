import { Avatar, Button } from "@mantine/core";

interface Props {
  name: string;
  url: string;
  iconSrc?: string;
}

export default function ListNavItem(props: Props) {
  return (
    <Button
      component="a"
      href={props.url}
      variant="subtle"
      color="gray"
      fullWidth
      justify="start"
      leftSection={
        <Avatar src={props.iconSrc ?? null} size={"sm"} radius={"sm"} />
      }
    >
      {props.name}
    </Button>
  );
}
