"use client";

import { Button, NavLink } from "@mantine/core";
import ListNavItem from "../listNavItem/ListNavItem";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiPlus, BiRightArrowAlt } from "react-icons/bi";
import useLists from "../../lib/queries/useLists";

export default function ListNavList() {
  const { lists } = useLists();

  return (
    <NavLink
      label={"Lists"}
      leftSection={<HiOutlineClipboardList size={25} />}
      c={"gray"}
      px={"6"}
    >
      <Button
        component="a"
        href="/dashboard/lists"
        variant="subtle"
        color="gray.5"
        fullWidth
        justify="start"
        leftSection={<BiPlus size={25} />}
      >
        New list
      </Button>
      <Button
        component="a"
        href="/dashboard/lists"
        variant="subtle"
        color="gray.5"
        fullWidth
        justify="start"
        leftSection={<BiRightArrowAlt size={25} />}
      >
        View more lists
      </Button>
      {lists && lists.lists.map((list) => (
        <ListNavItem
          key={list.uri}
          name={list.name}
          url={`/dashboard/profile/${list.creator.handle}/lists/${list.name}`}
          iconSrc={list.avatar}
        />
      ))}
    </NavLink>
  );
}
