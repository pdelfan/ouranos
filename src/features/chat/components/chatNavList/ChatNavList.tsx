"use client";

import { Button, NavLink } from "@mantine/core";
import { BiMessageRounded, BiRightArrowAlt } from "react-icons/bi";
import ChatNavItem from "../chatNavItem/ChatNavItem";
import Link from "next/link";
import useConvos from "../../lib/queries/useConvos";

export default function ChatNavList() {
  const { convos } = useConvos();

  return (
    <NavLink
      label={"Chat"}
      leftSection={<BiMessageRounded size={25} />}
      c={"gray"}
      px={"6"}
    >
      <Button
        component={Link}
        href="/dashboard/chats"
        variant="subtle"
        color="gray.5"
        fullWidth
        justify="start"
        leftSection={<BiRightArrowAlt size={25} />}
      >
        View more
      </Button>
      {convos && convos.length > 0 &&
        convos.map((convo) => <ChatNavItem key={convo.id} convo={convo} />)}
    </NavLink>
  );
}
