"use client";

import {
  Title,
  Text,
  Image,
  Group,
  Avatar,
  Stack,
  Button,
  ActionIcon,
  Container,
} from "@mantine/core";
import {
  BiPlus,
  BiCheck,
  BiSolidMessageRounded,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import useProfile from "../../lib/queries/useProfile";
import { useSession } from "@/app/providers/atproto";

interface Props {
  handle: string;
}

export default function ProfileHeader(props: Props) {
  const { handle } = props;
  const { profile } = useProfile({ handleOrDid: handle });
  const session = useSession();

  if (!profile || !session) return <>loading</>;

  return (
    <Container p={0} fluid>
      <Image
        src={profile.banner || null}
        alt="Banner"
        h={{ base: 120, md: 180 }}
      />
      <Container size={"xl"} px={"xs"}>
        <Group>
          <Avatar
            src={profile.avatar || null}
            name={profile.handle}
            alt={`${profile.handle}s avatar`}
            h={{ base: 110, md: 200 }}
            w={{ base: 110, md: 200 }}
            maw={{ base: 110, md: 200 }}
            mt={{ base: "-55px", md: "-100px" }}
            className="border-5 border-white"
          />
          <Group gap={"sm"} align="start">
            <Stack gap={0} align="flex-start">
              <Title order={1} fz={"h2"}>
                {profile.displayName || profile.handle}
              </Title>
              <Text c={"gray"} fz={"xl"} fw={500}>
                @{profile.handle}
              </Text>
            </Stack>
          </Group>
          <Group gap={"xs"} ml={"auto"} justify="flex-end">
            <ActionIcon
              size={"input-sm"}
              variant="light"
              color="gray"
              radius={"md"}
            >
              <BiDotsHorizontalRounded size={20} />
            </ActionIcon>
            {profile.viewer?.following && (
              <Button
                variant="light"
                color="gray"
                radius={"md"}
                leftSection={<BiCheck size={20} />}
              >
                Following
              </Button>
            )}
            {!profile.viewer?.following && session.did !== profile.did && (
              <Button radius={"md"} leftSection={<BiPlus size={20} />}>
                Follow
              </Button>
            )}
            {session.did === profile.did && (
              <Button variant="light" color="gray" radius={"md"}>
                Edit profile
              </Button>
            )}
            {session.did !== profile.did && (
              <Button
                variant="light"
                color="gray"
                radius={"md"}
                leftSection={<BiSolidMessageRounded size={20} />}
              >
                Message
              </Button>
            )}
          </Group>
        </Group>
      </Container>
    </Container>
  );
}
