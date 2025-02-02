import { getChatConvos } from "@/lib/atproto/bsky/chat";
import { Button, NavLink } from "@mantine/core";
import { BiMessageRounded, BiRightArrowAlt } from "react-icons/bi";
import ChatNavItem from "../chatNavItem/ChatNavItem";
import { log } from "console";
import { getSession } from "@/lib/auth/session";

export default async function ChatNavList() {
  const { convos } = await getChatConvos({});
  const session = await getSession();

  // filter out the user from members list
  const chats = convos.map((convo) => {
    return {
      ...convo,
      members: convo.members.filter((m) => m.did !== session.did),
    };
  });

  log(chats);

  return (
    <NavLink
      label={"Chat"}
      leftSection={<BiMessageRounded size={25} />}
      c={"gray"}
      px={"6"}
    >
      <Button
        component="a"
        href="/dashboard/chats"
        variant="subtle"
        color="gray.5"
        fullWidth
        justify="start"
        leftSection={<BiRightArrowAlt size={25} />}
      >
        View more
      </Button>
      {chats.length > 0 &&
        chats.map((convo) => <ChatNavItem key={convo.id} convo={convo} />)}
    </NavLink>
  );
}
