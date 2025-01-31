import NavItem from "./NavItem";
import {
  AppShellSection,
  AppShellNavbar,
  Image,
  ScrollArea,
  Divider,
  Button,
} from "@mantine/core";
import {
  BiHome,
  BiSolidHome,
  BiCog,
  BiPlanet,
  BiSolidCloud,
  BiSolidCog,
} from "react-icons/bi";
import { RiQuillPenFill } from "react-icons/ri";
import { PiMagnifyingGlassBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { FaBell, FaRegBell } from "react-icons/fa6";
import AccountSwitchMenu from "@/components/navigation/appShell/AccountSwitchMenu";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
import ChatNavList from "@/features/chat/components/chatNavList/ChatNavList";
import FeedNavList from "@/features/feeds/components/feedNavList/FeedNavList";
import ListNavList from "@/features/lists/components/listNavList/ListNavList";

export default function Navbar() {
  return (
    <AppShellNavbar>
      <AppShellSection p="md">
        <Image src={"/logoFull.svg"} alt="Ouranos logo" w={137} h={40} />
      </AppShellSection>
      <AppShellSection
        grow
        component={ScrollArea}
        px={"md"}
        pb={"md"}
        pt={"xs"}
      >
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
          icon={<BiPlanet size={25} />}
          activeIcon={<BiSolidCloud size={25} />}
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
        <Divider my={"sm"} />
        <FeedNavList />
        <ListNavList />
        {/* <ChatNavList /> */}
      </AppShellSection>
      <AppShellSection px={"md"} pb={"md"}>
        <Button
          size="md"
          radius={"md"}
          fullWidth
          leftSection={<RiQuillPenFill size={20} />}
        >
          New post
        </Button>
      </AppShellSection>
      <Divider />
      <AppShellSection>
        <AccountSwitchMenu />
      </AppShellSection>
    </AppShellNavbar>
  );
}
