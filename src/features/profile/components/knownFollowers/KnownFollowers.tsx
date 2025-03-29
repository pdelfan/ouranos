"use client";

import { Avatar, Group, Paper, Text } from "@mantine/core";
import useKnownFollowers from "../../lib/queries/useKnownFollowers";
import Link from "next/link";

interface Props {
  handle: string;
}

export default function KnownFollowers(props: Props) {
  const {
    knownFollowers,
    isKnownFollowersEmpty,
    knownFollowersError,
    isLoadingKnownFollowers,
    isFetchingKnownFollowers,
  } = useKnownFollowers({ handle: props.handle });

  const followers = knownFollowers && knownFollowers.pages[0].followers;

  if (isLoadingKnownFollowers || isFetchingKnownFollowers) {
    return <>Loading</>;
  }

  if (knownFollowersError) {
    return <>Error</>;
  }

  if (!followers || isKnownFollowersEmpty) {
    return;
  }

  const MAX_DISPLAYED = 2;
  const displayFollowers = followers.slice(0, MAX_DISPLAYED);
  const remainingFollowersCount = followers.length - MAX_DISPLAYED;
  const followerNames = displayFollowers.map((f) => f.displayName || f.handle);

  let formattedText = followerNames.join(", ");
  if (remainingFollowersCount > 0) {
    formattedText += `, and ${remainingFollowersCount} others`;
  }

  return (
    <Paper bg={"gray.1"} p={"sm"} radius={"md"}>
      <Group gap={"xs"}>
        <Avatar.Group spacing={"xs"}>
          {followers.slice(0, 10).map((p) => (
            <Avatar
              key={p.did}
              component={Link}
              href={`/dashboard/profile/${p.handle}`}
              src={p.avatar}
              alt={`${p.handle}`}
              name={p.handle}
              size={30}
            />
          ))}
        </Avatar.Group>
        <Text fz={"sm"} fw={500} c={"gray"}>
          Followed by {formattedText}
        </Text>
      </Group>
    </Paper>
  );
}
