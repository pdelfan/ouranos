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
  Box,
} from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { getProfile } from "@/lib/atproto/bsky/actor";
import { getSession } from "@/lib/auth/session";

export default async function AccountSwitchMenu() {
  const session = await getSession();
  const profile = await getProfile({ handleOrDid: session.did });

  return (
    <Group gap={"sm"} wrap="nowrap" px={"md"} py={"xs"} align="flex-start">
      <Avatar
        component="a"
        href={`/dashboard/user/${profile.handle}`}
        src={profile.avatar?.replace("avatar", "avatar_thumbnail") ?? null}
        alt={`${profile.handle}s avatar`}
        name={profile.handle}
        color="purple"
        variant="filled"
      />
      <Box w={"80%"}>
        <Stack gap={0}>
          {profile.displayName && (
            <Text fw={500} size="sm" truncate="end">
              {profile.displayName}
            </Text>
          )}

          <Text c="gray" size="sm" truncate="end">
            {profile.handle}
          </Text>
        </Stack>
      </Box>
    </Group>
  );
}

{
  /* <Menu shadow="md" radius={"md"}>
  <MenuTarget>
    <ActionIcon variant="light" color="gray" radius={"xl"}>
      <BsThreeDots />
    </ActionIcon>
  </MenuTarget>
  <MenuDropdown>
    <MenuItem
      component="a"
      href="/api/auth/logout"
      leftSection={<BiLogOut />}
    >
      Sign out
    </MenuItem>
  </MenuDropdown>
</Menu> */
}
