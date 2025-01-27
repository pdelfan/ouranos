"use client";

import { AppShell, Image, NavLink, ScrollArea } from "@mantine/core";
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
import { BsChatDots, BsBookmark, BsStars } from "react-icons/bs";
import { FaBell, FaRegBell } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";

interface Props {
  children: React.ReactNode;
}

export function Shell(props: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Image src={"/logoFull.svg"} alt="Ouranos logo" w={137} h={40} />
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <NavLink href="/dashboard" label="Home" leftSection={<BiHome />} />
          <NavLink
            href="/dashboard/search"
            label="Search"
            leftSection={<PiMagnifyingGlassBold />}
          />
          <NavLink
            href="/dashboard/explore"
            label="Explore"
            leftSection={<BsStars />}
          />
          <NavLink
            href="/dashboard/feeds"
            label="Feeds"
            leftSection={<BiPlanet />}
          />
          <NavLink
            href="/dashboard/lists"
            label="Lists"
            leftSection={<HiOutlineClipboardList />}
          />
          <NavLink
            href="/dashboard/chat"
            label="Chat"
            leftSection={<BsChatDots />}
          />
          <NavLink
            href="/dashboard/bookmarks"
            label="Bookmarks"
            leftSection={<BsBookmark />}
          />
          <NavLink
            href="/dashboard/notifications"
            label="Notifications"
            leftSection={<FaRegBell />}
          />
          <NavLink
            href="/dashboard/settings"
            label="Settings"
            leftSection={<BiCog />}
          />
        </AppShell.Section>
        <AppShell.Section>
          Navbar footer – always at the bottom
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}
