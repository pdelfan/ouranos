"use client";

import { usePathname } from "next/navigation";
import NavItem from "../navbar/NavItem";
import { useScrollContext } from "@/app/providers/scroll";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { getUnreadNotificationsCount } from "@/lib/api/bsky/notification";
import { useQuery } from "@tanstack/react-query";
import { BiCog, BiHash, BiHome, BiSolidCog, BiSolidHome } from "react-icons/bi";
import { PiMagnifyingGlassBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { FaRegBell } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";

export default function AppBar() {
  const pathname = usePathname();
  const val = useScrollContext();
  const agent = useAgent();
  const {
    data: notificationsCount,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["notificationsCount"],
    queryFn: () => getUnreadNotificationsCount(agent),
    refetchInterval: 10000,
  });

  const canUpdate = typeof window !== "undefined";

  return (
    <nav
      className="flex justify-between pb-8 pt-1 px-6 border-t gap-6 fixed bottom-0 z-40 w-full md:hidden bg-white overflow-auto"
      style={{
        opacity: canUpdate ? `${100 - (val ?? 0)}%` : "none",
        transform: canUpdate ? `translateY(${val ?? 0}%)` : "none",
      }}
    >
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
        icon={<BiHash className="text-2xl md:text-3xl" />}
        activeIcon={<BiHash className="text-2xl md:text-3xl" />}
        title="Feeds"
        isActive={pathname === "/dashboard/feeds"}
      />

      <NavItem
        href="/dashboard/notifications"
        icon={<FaRegBell className="text-2xl md:text-3xl" />}
        activeIcon={<FaBell className="text-2xl md:text-3xl" />}
        title="Notifications"
        isActive={pathname.includes("notifications")}
        badge={notificationsCount ?? 0}
      />

      <NavItem
        href="/dashboard/settings"
        icon={<BiCog className="text-2xl md:text-3xl" />}
        activeIcon={<BiSolidCog className="text-2xl md:text-3xl" />}
        title="Settings"
        isActive={pathname.includes("settings")}
      />
    </nav>
  );
}
