"use client";

import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Link from "next/link";
import ComposeButton from "@/components/actions/composeButton/ComposeButton";

interface Props {
  handle: string;
  avatar?: string;
}

export default function Aside(props: Props) {
  const { handle, avatar } = props;

  return (
    <aside className="sticky top-6 hidden h-full md:block">
      <div className="flex flex-col items-center gap-3 lg:flex-row border border-skin-base p-2 rounded-full">
        <ComposeButton />
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
