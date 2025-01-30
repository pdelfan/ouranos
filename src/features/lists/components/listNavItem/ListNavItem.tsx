import { Avatar, Button } from "@mantine/core";
import { BsFillPeopleFill } from "react-icons/bs";

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
        props.iconSrc ? (
          <Avatar src={props.iconSrc} size={"sm"} radius={"sm"} />
        ) : (
          <Avatar size={"sm"} radius={"sm"}>
            <BsFillPeopleFill size={20} />
          </Avatar>
        )
      }
    >
      {props.name}
    </Button>
  );
}
