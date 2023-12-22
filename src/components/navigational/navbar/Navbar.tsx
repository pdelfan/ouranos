"use client";

import { useSession } from "next-auth/react";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationsCount } from "@/lib/api/bsky/notification";
import useAgent from "@/lib/hooks/bsky/useAgent";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const agent = useAgent();
  const {
    data: notificationsCount,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["notificationsCount"],
    queryFn: () => getUnreadNotificationsCount(agent),
    refetchInterval: 15000,
  });

  return (
    <nav className="inline-flex flex-col gap-6 lg:ml-1.5">
      <NavItem
        href="/dashboard/home"
        icons={["bxs:home", "bx:home"]}
        title="Home"
        isActive={pathname === "/dashboard/home"}
        className="sm:m-0"
      />
      <NavItem
        href="/dashboard/search"
        icons={["mingcute:search-fill", "bx:search"]}
        title="Search"
        isActive={pathname.includes("search")}
        className="sm:m-0"
      />
      <NavItem
        href="/dashboard/feeds"
        icons={["bx:hash", "bx:hash"]}
        title="Feeds"
        isActive={pathname === "/dashboard/feeds"}
        className="sm:m-0"
      />

      <div className="relative">
        <NavItem
          href="/dashboard/notifications"
          icons={["mdi:bell", "mdi:bell-outline"]}
          title="Notifications"
          isActive={pathname.includes("notifications")}
          className="sm:m-0"
        />
        {notificationsCount !== undefined && notificationsCount > 0 && (
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-primary border-2 border-white rounded-full -top-2 start-3 dark:border-gray-900 animate-fade animate-duration-300">
            {notificationsCount < 10 ? notificationsCount : "9+"}
          </div>
        )}
      </div>

      <NavItem
        href={`/dashboard/user/${session?.user.handle}`}
        icons={["bxs:user", "bx:user"]}
        title="Profile"
        isActive={pathname.includes(`/dashboard/user/${session?.user.handle}`)}
        className="sm:m-0"
      />
      <NavItem
        href="/dashboard/settings"
        icons={["bxs:cog", "bx:cog"]}
        title="Settings"
        isActive={pathname.includes("settings")}
        className="sm:m-0"
      />
    </nav>
  );
}
