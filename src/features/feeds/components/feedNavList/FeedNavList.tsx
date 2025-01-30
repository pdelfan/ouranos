import { Alert, Button, NavLink } from "@mantine/core";
import { Fragment } from "react";
import { BiPlanet, BiPlus, BiRightArrowAlt } from "react-icons/bi";
import { LuInfo } from "react-icons/lu";
import FeedNavItem from "../feedNavItem/FeedNavItem";

interface Props {}

export default async function FeedNavList(props: Props) {
  return (
    <NavLink
      label={"Feeds"}
      leftSection={<BiPlanet size={25} />}
      c={"gray"}
      px={"6"}
    >
      <Button
        component="a"
        href="/dashboard/feeds"
        variant="subtle"
        color="gray.5"
        fullWidth
        justify="start"
        leftSection={<BiRightArrowAlt size={25} />}
      >
        View all
      </Button>
    </NavLink>
  );
}
