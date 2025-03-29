"use client";

import {
  Text,
  ActionIcon,
  Avatar,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Stack,
} from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useSession } from "@/app/providers/atproto";
import useProfile from "@/features/profile/lib/queries/useProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountSwitchMenu() {
  const router = useRouter();
  const session = useSession();
  const {profile} = useProfile({handleOrDid: session.did});

  return (
    <Group justify="space-between" px={"md"} py={"xs"} wrap="nowrap" gap={"md"}>
      {profile && (<Group gap={"sm"} wrap="nowrap">
        <Avatar
          component={Link}
          href={`/dashboard/profile/${profile.handle}`}
          src={profile.avatar?.replace("avatar", "avatar_thumbnail") || null}
          alt={`${profile.handle}s avatar`}
          name={profile.handle}
          color="purple"
          variant="filled"
        />
        <Stack gap={0} w={170}>
          {profile.displayName && (
            <Text fw={500} size="sm" truncate="end">
              {profile.displayName}
            </Text>
          )}

          <Text c="gray" size="sm" truncate="end">
            {profile.handle}
          </Text>
        </Stack>
      </Group>)}
      <Menu shadow="md" radius={"md"}>
        <MenuTarget>
          <ActionIcon variant="light" color="gray" radius={"md"}>
            <BsThreeDots />
          </ActionIcon>
        </MenuTarget>
        <MenuDropdown>
          <MenuItem
            leftSection={<BiLogOut />}
            onClick={async () => {
              await session.signOut();
              router.push("/");
            }}
          >
            Sign out
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </Group>
  );
}
