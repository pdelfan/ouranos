import { getChatConvos } from "@/lib/atproto/bsky/chat";
import { NavLink } from "@mantine/core";
import { BiMessageRounded } from "react-icons/bi";
import ChatNavItem from "../chatNavItem/ChatNavItem";

export default async function ChatNavList() {
  const { convos } = await getChatConvos({});

  if (convos.length === 0) return null;

  return (
    <NavLink
      label={"Chat"}
      leftSection={<BiMessageRounded size={25} />}
      c={"gray"}
      px={"6"}
    >
      {/* {convos.map((convo) => (
        <ChatNavItem key={convo.id} convo={convo} />
      ))} */}
    </NavLink>
  );
}
