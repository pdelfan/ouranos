"use client";

import { usePathname } from "next/navigation";
import NavItem from "../navbar/NavItem";
import { useScrollContext } from "@/app/providers/scroll";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { getUnreadNotificationsCount } from "@/lib/api/bsky/notification";
import { useQuery } from "@tanstack/react-query";

export default function AppBar() {
  const pathname = usePathname();
  const show = useScrollContext();
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
    <nav
      className={`flex justify-between pb-8 pt-1 px-6 border-t gap-6 fixed bottom-0 z-40 w-full md:hidden bg-white ${
        show ? "translate-y-0 opacity-100" : "translate-y-36 opacity-0"
      } transition-all ease-in-out duration-500`}
    >
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
      <div className="relative">
        <NavItem
          href="/dashboard/notifications"
          icons={["mdi:bell", "mdi:bell-outline"]}
          title="Notifications"
          isActive={pathname.includes("notifications")}
        />
        {notificationsCount !== undefined && notificationsCount > 0 && (
          <div className="absolute inline-flex items-center justify-center  h-6 w-6 text-[0.6rem] font-bold text-white bg-primary border-3 border-white rounded-full -top-1 start-4 dark:border-gray-900 animate-fade animate-duration-300">
            {notificationsCount < 10 ? notificationsCount : "9+"}
          </div>
        )}
      </div>
      <NavItem
        href="/dashboard/settings"
        icons={["bxs:cog", "bx:cog"]}
        title="Settings"
        isActive={pathname.includes("settings")}
      />
    </nav>
  );
}
