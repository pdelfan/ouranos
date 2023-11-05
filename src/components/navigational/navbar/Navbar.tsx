"use client";

import { useSession } from "next-auth/react";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="inline-flex flex-col gap-6">
      <NavItem
        href="/dashboard"
        icons={["bxs:home", "bx:home"]}
        title="Home"
        isActive={pathname === "/dashboard"}
      />
      <NavItem
        href="/dashboard/search"
        icons={["bxs:search", "bx:search"]}
        title="Search"
        isActive={pathname.includes("search")}
      />
      <NavItem
        href="/dashboard/feeds"
        icons={["bx:hash", "bx:hash"]}
        title="Feeds"
        isActive={pathname.includes("feeds")}
      />
      <NavItem
        href="/dashboard/notifications"
        icons={["bxs:bell", "bx:bell"]}
        title="Notifications"
        isActive={pathname.includes("notifications")}
      />
      <NavItem
        href={`/dashboard/user/${session?.user.handle}`}
        icons={["bxs:user", "bx:user"]}
        title="Profile"
        isActive={pathname === `/dashboard/user/${session?.user.handle}`}
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
