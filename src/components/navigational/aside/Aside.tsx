"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Link from "next/link";
import NavItem from "../navbar/NavItem";
import { FaRegBell } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationsCount } from "@/lib/api/bsky/notification";
import { BiCog } from "react-icons/bi";

interface Props {
  handle: string;
  avatar?: string;
}

export default function Aside(props: Props) {
  const { handle, avatar } = props;
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

  return (
    <aside className="sticky top-6 hidden h-full md:block">
      <div className="flex flex-col items-center gap-3 lg:flex-row border px-2 py-3 lg:px-3 lg:py-2 rounded-full">
        <NavItem
          href="/dashboard/settings"
          icon={<BiCog className="text-2xl" />}
        />
        <NavItem
          href="/dashboard/notifications"
          icon={<FaRegBell className="text-2xl" />}
          badge={notificationsCount ?? 0}
        />
        <Link
          href={`/dashboard/user/${handle}`}
          className="max-w-[7rem] truncate hover:brightness-90"
        >
          <Avatar src={avatar?.replace("avatar", "avatar_thumbnail")} />
        </Link>
      </div>
    </aside>
  );
}
