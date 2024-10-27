"use client";

import { useSession } from "next-auth/react";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

import {
  BiHome,
  BiSolidHome,
  BiSolidUser,
  BiUser,
  BiPlanet,
  BiSolidPlanet,
} from "react-icons/bi";
import { PiMagnifyingGlassBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { HiClipboardList, HiOutlineClipboardList } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="inline-flex flex-col gap-5 lg:ml-1.5">
      <NavItem
        href="/dashboard/home"
        icon={<BiHome className="text-2xl md:text-3xl" />}
        activeIcon={<BiSolidHome className="text-2xl md:text-3xl" />}
        title="Home"
        isActive={pathname === "/dashboard/home"}
      />
      <NavItem
        href="/dashboard/search"
        icon={<PiMagnifyingGlassBold className="text-2xl md:text-3xl" />}
        activeIcon={<PiMagnifyingGlassFill className="text-2xl md:text-3xl" />}
        title="Search"
        isActive={pathname.includes("search")}
      />
      <NavItem
        href="/dashboard/feeds"
        icon={<BiPlanet className="text-2xl md:text-3xl" />}
        activeIcon={<BiSolidPlanet className="text-2xl md:text-3xl" />}
        title="Feeds"
        isActive={pathname === "/dashboard/feeds"}
      />
      <NavItem
        href="/dashboard/lists"
        icon={<HiOutlineClipboardList className="text-2xl md:text-3xl" />}
        activeIcon={<HiClipboardList className="text-2xl md:text-3xl" />}
        title="Lists"
        isActive={pathname === "/dashboard/lists"}
      />
      <NavItem
        href={`/dashboard/user/${session?.user.handle}`}
        icon={<BiUser className="text-2xl md:text-3xl" />}
        activeIcon={<BiSolidUser className="text-2xl md:text-3xl" />}
        title="Profile"
        isActive={pathname.includes(`/dashboard/user/${session?.user.handle}`)}
      />
    </nav>
  );
}
