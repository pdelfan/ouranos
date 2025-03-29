import { ChatBskyConvoDefs } from "@atproto/api";
import { ConvoView } from "@atproto/api/dist/client/types/chat/bsky/convo/defs";
import { Avatar, Card, Group, Indicator, Stack, Text } from "@mantine/core";
import classes from "./ChatNavItem.module.css";

interface Props {
  convo: ConvoView;
}

export default function ChatNavItem(props: Props) {
  const url = `/dashboard/chat/${props.convo.id}`;

  return (
    <Card
      component="a"
      href={url}
      p={"xs"}
      className={classes.root}
      radius={"md"}
    >
      {props.convo.members.map((m) => (
        <Group key={m.did} gap={"xs"} wrap="nowrap" align="start">
          <Indicator
            disabled={props.convo.unreadCount === 0}
            offset={4}
            size={12}
            withBorder
          >
            <Avatar
              src={m.avatar?.replace("avatar", "avatar_thumbnail") || null}
              alt={`${m.handle}s avatar`}
              name={m.handle}
              color="purple"
              variant="filled"
            />
          </Indicator>
          <Stack gap={"0"}>
            <Text fz={"sm"} fw={500}>
              {m.displayName || `@${m.handle}`}
            </Text>
            {ChatBskyConvoDefs.isMessageView(props.convo.lastMessage) && (
              <Text fz={"sm"} c={"gray"} lineClamp={1}>
                {props.convo.lastMessage.text}
              </Text>
            )}
          </Stack>
        </Group>
      ))}
    </Card>
  );
}
