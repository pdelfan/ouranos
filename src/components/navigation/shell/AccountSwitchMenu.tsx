import {
  ActionIcon,
  Avatar,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
} from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";

export default function AccountSwitchMenu() {
  return (
    <Group justify="space-between" p={"md"}>
      {/* <Avatar
        src={
          ""
        }
        alt=""
      /> */}
      <Menu shadow="md">
        <MenuTarget>
          <ActionIcon variant="subtle">
            <BsThreeDots />
          </ActionIcon>
        </MenuTarget>
        <MenuDropdown>
          <MenuItem component="a" href="/api/auth/logout">
            Sign out
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </Group>
  );
}
