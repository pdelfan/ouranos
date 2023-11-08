"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import NavItem from "../navbar/NavItem";

export default function AppBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between p-3 border-t gap-6 fixed bottom-0 z-50 w-full sm:hidden bg-white">
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
    </nav>
  );
}
