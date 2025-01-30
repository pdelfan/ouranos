import {
  AppShellSection,
  AppShellNavbar,
  Image,
  ScrollArea,
  Divider,
} from "@mantine/core";
import {
  BiHome,
  BiSolidHome,
  BiPlanet,
  BiSolidPlanet,
  BiCog,
  BiCloud,
  BiSolidCloud,
  BiSolidCog,
} from "react-icons/bi";
import { PiMagnifyingGlassBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { HiClipboardList, HiOutlineClipboardList } from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import { FaBell, FaRegBell } from "react-icons/fa6";
import AccountSwitchMenu from "@/components/navigation/appShell/AccountSwitchMenu";
import {
  BiMessageRounded,
  BiSolidMessageRounded,
  BiBookmark,
  BiSolidBookmark,
} from "react-icons/bi";
import NavItem from "./NavItem";

export default function Navbar() {
  return (
    <AppShellNavbar>
      <AppShellSection p="md">
        <Image src={"/logoFull.svg"} alt="Ouranos logo" w={137} h={40} />
      </AppShellSection>
      <AppShellSection grow component={ScrollArea} p={"md"}>
        <NavItem
          href="/dashboard"
          label="Home"
          icon={<BiHome size={25} />}
          activeIcon={<BiSolidHome size={25} />}
        />
        <NavItem
          href="/dashboard/search"
          label="Search"
          icon={<PiMagnifyingGlassBold size={25} />}
          activeIcon={<PiMagnifyingGlassFill size={25} />}
        />
        <NavItem
          href="/dashboard/explore"
          label="Explore"
          icon={<BiCloud size={25} />}
          activeIcon={<BiSolidCloud size={25} />}
        />
        <NavItem
          href="/dashboard/feeds"
          label="Feeds"
          icon={<BiPlanet size={25} />}
          activeIcon={<BiSolidPlanet size={25} />}
        />
        <NavItem
          href="/dashboard/lists"
          label="Lists"
          icon={<HiOutlineClipboardList size={25} />}
          activeIcon={<HiClipboardList size={25} />}
        />
        <NavItem
          href="/dashboard/chat"
          label="Chat"
          icon={<BiMessageRounded size={25} />}
          activeIcon={<BiSolidMessageRounded size={25} />}
        />
        <NavItem
          href="/dashboard/bookmarks"
          label="Bookmarks"
          icon={<BiBookmark size={25} />}
          activeIcon={<BiSolidBookmark size={25} />}
        />
        <NavItem
          href="/dashboard/notifications"
          label="Notifications"
          icon={<FaRegBell size={25} />}
          activeIcon={<FaBell size={25} />}
        />
        <NavItem
          href="/dashboard/settings"
          label="Settings"
          icon={<BiCog size={25} />}
          activeIcon={<BiSolidCog size={25} />}
        />
      </AppShellSection>
      <Divider />
      <AppShellSection>
        <AccountSwitchMenu />
      </AppShellSection>
    </AppShellNavbar>
  );
}
