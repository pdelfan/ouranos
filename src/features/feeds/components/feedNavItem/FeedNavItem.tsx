import { Avatar, Button } from "@mantine/core";
import { MdOutlineRssFeed } from "react-icons/md";

interface Props {
  name: string;
  url: string;
  iconSrc?: string;
}

export default function FeedNavItem(props: Props) {
  return (
    <Button
      component="a"
      href={props.url}
      variant="subtle"
      color="gray"
      fullWidth
      justify="start"
      leftSection={
        props.iconSrc ? (
          <Avatar src={props.iconSrc || null} size={"sm"} radius={"sm"} />
        ) : (
          <Avatar size={"sm"} radius={"sm"}>
            <MdOutlineRssFeed size={20} />
          </Avatar>
        )
      }
    >
      {props.name}
    </Button>
  );
}
