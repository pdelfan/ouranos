import { getProfile } from "@/lib/api/bsky/actor";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import SignOut from "@/components/actions/signOut/SignOut";
import Link from "next/link";
import { getSessionFromServer } from "@/lib/api/auth/session";

export default async function Aside() {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.bskySession.handle);

  return (
    <aside className="sticky h-full top-6 hidden md:block">
      <div className="flex flex-col gap-1 items-center lg:flex-row lg:gap-3">
        <div className="flex flex-col items-end order-last lg:order-first">
          <Link
            href={`/dashboard/user/${profile?.handle}`}
            className="hidden lg:inline font-semibold max-w-[7rem] truncate text-neutral-700 hover:text-neutral-500"
          >
            {profile?.displayName ?? profile?.handle}
          </Link>
          <SignOut />
        </div>
        <Link
          href={`/dashboard/user/${profile?.handle}`}
          className="max-w-[7rem] truncate hover:brightness-90"
        >
          <Avatar src={profile?.avatar} />
        </Link>
      </div>
    </aside>
  );
}
