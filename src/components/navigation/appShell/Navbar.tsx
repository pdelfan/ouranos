import {
  AppShellSection,
  AppShellNavbar,
  Image,
  ScrollArea,
  Button,
} from "@mantine/core";
import {
  BiHome,
  BiSolidHome,
  BiPlanet,
  BiSolidPlanet,
  BiCog,
  BiSolidCog,
} from "react-icons/bi";
import { PiMagnifyingGlassBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { HiClipboardList, HiOutlineClipboardList } from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import { FaBell, FaRegBell } from "react-icons/fa6";
import AccountSwitchMenu from "./AccountSwitchMenu";
import { BiMessageRounded, BiBookmark } from "react-icons/bi";

export default function Navbar() {
  return (
    <AppShellNavbar>
      <AppShellSection p="md">
        <Image src={"/logoFull.svg"} alt="Ouranos logo" w={137} h={40} />
      </AppShellSection>
      <AppShellSection grow component={ScrollArea} p="md">
        <Button
          component="a"
          href="/dashboard"
          variant="subtle"
          color="gray"
          size="md"
          fullWidth
          justify="start"
          px={"6"}
          leftSection={<BiHome size={25} />}
        >
          Home
        </Button>
        <Button
          component="a"
          href="/dashboard/search"
          variant="subtle"
          color="gray"
          size="md"
          fullWidth
          justify="start"
          px={"6"}
          leftSection={<PiMagnifyingGlassBold size={25} />}
        >
          Search
        </Button>
        <Button
          component="a"
          href="/dashboard/explore"
          variant="subtle"
          color="gray"
          size="md"
          fullWidth
          justify="start"
          px={"6"}
          leftSection={<BsStars size={25} />}
        >
          Explore
        </Button>
        <Button
          component="a"
          href="/dashboard/feeds"
          variant="subtle"
          color="gray"
          size="md"
          fullWidth
          justify="start"
          px={"6"}
          leftSection={<BiPlanet size={25} />}
        >
          Feeds
        </Button>
        <Button
          component="a"
          href="/dashboard/lists"
          variant="subtle"
          color="gray"
          size="md"
          fullWidth
          justify="start"
          px={"6"}
          leftSection={<HiOutlineClipboardList size={25} />}
        >
          Lists
        </Button>
        <Button
          component="a"
          href="/dashboard/chat"
          variant="subtle"
          color="gray"
          size="md"
          fullWidth
          justify="start"
          px={"6"}
          leftSection={<BiMessageRounded size={25} />}
        >
          Chat
        </Button>
        <Button
          component="a"
          href="/dashboard/bookmarks"
          variant="subtle"
          color="gray"
          size="md"
          fullWidth
          justify="start"
          px={"6"}
          leftSection={<BiBookmark size={25} />}
        >
          Bookmarks
        </Button>
        <Button
          component="a"
          href="/dashboard/notifications"
          variant="subtle"
          color="gray"
          size="md"
          fullWidth
          justify="start"
          px={"6"}
          leftSection={<FaRegBell size={25} />}
        >
          Notifications
        </Button>
        <Button
          component="a"
          href="/dashboard/settings"
          variant="subtle"
          color="gray"
          size="md"
          fullWidth
          justify="start"
          px={"6"}
          leftSection={<BiCog size={25} />}
        >
          Settings
        </Button>
      </AppShellSection>
      <AppShellSection>
        <AccountSwitchMenu />
      </AppShellSection>
    </AppShellNavbar>
  );
}
