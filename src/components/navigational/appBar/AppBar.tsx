"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import NavItem from "../navbar/NavItem";

export default function AppBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between py-4 px-6 border-t gap-6 fixed bottom-0 z-40 w-full md:hidden bg-white">
      <NavItem
        href="/dashboard/home"
        icons={["bxs:home", "bx:home"]}
        title="Home"
        isActive={pathname === "/dashboard/home"}
      />
      <NavItem
        href="/dashboard/search"
        icons={["mingcute:search-fill", "bx:search"]}
        title="Search"
        isActive={pathname.includes("search")}
      />
      <NavItem
        href="/dashboard/feeds"
        icons={["bx:hash", "bx:hash"]}
        title="Feeds"
        isActive={pathname === "/dashboard/feeds"}
      />
      <NavItem
        href="/dashboard/notifications"
        icons={["bxs:bell", "bx:bell"]}
        title="Notifications"
        isActive={pathname.includes("notifications")}
      />
      <NavItem
        href="/dashboard/settings"
        icons={["bxs:cog", "bx:cog"]}
        title="Settings"
        isActive={pathname.includes("settings")}
      />
    </nav>
  );
}
