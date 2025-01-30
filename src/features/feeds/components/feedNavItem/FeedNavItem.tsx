import { Avatar, Button } from "@mantine/core";

interface Props {
  name: string;
  iconSrc?: string;
}

export default function FeedNavItem(props: Props) {
  const url = "/dashboard/user/[handle]/feed/[feedname]";

  return (
    <Button
      component="a"
      href={url}
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
