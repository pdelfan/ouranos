import { getProfile } from "@/lib/api/bsky/actor";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import SignOut from "@/components/actions/signOut/SignOut";
import Link from "next/link";
import { getSessionFromServer } from "@/lib/api/auth/session";

export default async function Aside() {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.bskySession.handle);

  return (
    <aside className="sticky h-full top-6 hidden lg:block">
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-end">
          <Link
            href={`/dashboard/user/${profile?.handle}`}
            className="font-semibold max-w-[7rem] truncate text-neutral-700 hover:text-neutral-500"
          >
            {profile?.displayName ?? profile?.handle}
          </Link>
          <SignOut />
        </div>
        <Link
          href={`/dashboard/user/${profile?.handle}`}
          className="font-semibold max-w-[7rem] truncate hover:brightness-90"
        >
          <Avatar profile={profile} />
        </Link>
      </div>
    </aside>
  );
}
