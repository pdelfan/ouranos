"use client";

import Button from "@/components/actions/button/Button";
import SignOut from "@/components/actions/signOut/SignOut";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Image from "next/image";
import Link from "next/link";

interface Props {
  profile: ProfileViewDetailed;
}

export default function TopBar(props: Props) {
  const { profile } = props;

  return (
    <div className="flex justify-between bg-white border-b md:border-b-0 px-3 md:px-0 py-2.5 md:pt-0 sticky md:relative top-0 z-50 lg:hidden">
      <Link
        href={`/dashboard/user/${profile?.handle}`}
        className="hover:brightness-90"
      >
        <Avatar profile={profile} size="sm" />
      </Link>
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline"
      >
        <Image src="/logo.svg" alt="Ouranos logo" width={100} height={100} />
      </Button>
      <SignOut iconOnly={true} />
    </div>
  );
}
