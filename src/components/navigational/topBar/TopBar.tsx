"use client";

import { useScrollContext } from "@/app/providers/scroll";
import Button from "@/components/actions/button/Button";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Image from "next/image";
import Link from "next/link";
import { BiCog } from "react-icons/bi";

interface Props {
  profile: ProfileViewDetailed;
}

export default function TopBar(props: Props) {
  const { profile } = props;
  const val = useScrollContext();
  const canUpdate = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="bg-skin-base border-skin-base sticky top-0 z-50 flex items-center justify-between border-b px-3 py-2.5 transition-all ease-linear md:hidden"
      style={{
        opacity: canUpdate ? `${100 - (val ?? 0)}%` : "100%",
        transform: canUpdate ? `translateY(-${val ?? 0}%)` : "translateY(-0%)",
      }}
    >
      <Link
        href={`/dashboard/user/${profile?.handle}`}
        className="hover:brightness-90"
      >
        <Avatar
          src={profile.avatar?.replace("avatar", "avatar_thumbnail")}
          size="sm"
        />
      </Link>
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline"
      >
        <Image src="/logo.svg" alt="Ouranos logo" width={100} height={100} />
      </Button>
      <Link href="/dashboard/settings">
        <BiCog className="text-skin-icon-muted hover:text-skin-icon-base text-2xl md:text-3xl" />
      </Link>
    </div>
  );
}
