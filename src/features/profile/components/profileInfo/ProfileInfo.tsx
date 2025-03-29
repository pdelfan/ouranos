"use client";

import { Title, Text, Group, Stack, Container } from "@mantine/core";
import KnownFollowers from "../knownFollowers/KnownFollowers";
import useProfile from "../../lib/queries/useProfile";
import { useSession } from "@/app/providers/atproto";

interface Props {
  handle: string;
}

export default function ProfileInfo(props: Props) {
  const { handle } = props;
  const session = useSession();
  const { profile } = useProfile({ handleOrDid: handle });

  if (!profile) return <>loading</>;

  return (
    <Container p={0}>
      <Stack gap={"xl"}>
        <Stack>
          <Title order={2} fz={"lg"} fw={500}>
            About
          </Title>
          {profile.description && <Text maw={700}>{profile.description}</Text>}
          <Group gap={"xs"}>
            <Group gap={"5"}>
              <Text fw={500}>{profile.followsCount || 0}</Text>
              <Text fw={500} c={"gray"}>
                Following
              </Text>
            </Group>
            <Group gap={"5"}>
              <Text fw={500}>{profile.followersCount || 0}</Text>
              <Text fw={500} c={"gray"}>
                Followers
              </Text>
            </Group>
            <Group gap={"5"}>
              <Text fw={500}>{profile.postsCount || 0}</Text>
              <Text fw={500} c={"gray"}>
                Posts
              </Text>
            </Group>
          </Group>
          {session.did !== profile.did && (
            <KnownFollowers handle={profile.handle} />
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
