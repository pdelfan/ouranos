"use client";

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

  return (
    <div className="bg-skin-base border-skin-base sticky top-0 z-[60] flex items-center justify-between border-b px-3 py-2.5 transition-all ease-linear md:hidden">
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
        <div className="flex items-center gap-2 group">
          <Image
            src="/ouranos.svg"
            alt="Ouranos logo"
            width={30}
            height={30}
            className="block transition-transform duration-700 ease-in-out group-hover:rotate-180"
          />
          <Image
            src="/ouranosText.svg"
            alt="Ouranos text"
            width={60}
            height={20}
          />
        </div>{" "}
      </Button>
      <Link href="/dashboard/settings">
        <BiCog className="text-skin-icon-muted hover:text-skin-icon-base text-2xl md:text-3xl" />
      </Link>
    </div>
  );
}
