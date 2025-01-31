import { ConvoView } from "@atproto/api/dist/client/types/chat/bsky/convo/defs";
import { Card, Text } from "@mantine/core";

interface Props {
  convo: ConvoView;
}

export default function ChatNavItem(props: Props) {
  const url = `/dashboard/chat/${props.convo.id}`;

  return (
    <Card component="a" href={url}>
      {/* {props.convo.members.map((m, i) => (
        <Text>{m.displayName ?? m.handle}</Text>
      ))} */}
      <Text>{props.convo.rev}</Text>
    </Card>
  );
}
