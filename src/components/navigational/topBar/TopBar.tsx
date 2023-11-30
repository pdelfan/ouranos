import { getSessionFromServer } from "@/app/api/auth/[...nextauth]/route";
import SignOut from "@/components/actions/signOut/SignOut";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import { getProfile } from "@/lib/api/bsky/actor";
import Image from "next/image";
import Link from "next/link";

export default async function TopBar() {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.bskySession.handle);

  return (
    <div className="flex justify-between bg-white border-b sm:border-b-0 px-3 sm:px-0 py-2.5 sticky md:relative top-0 z-50 lg:hidden">
      <Link
        href={`/dashboard/user/${profile?.handle}`}
        className="hover:brightness-90"
      >
        <Avatar profile={profile} size="sm" />
      </Link>
      <Image src="/logo.svg" alt="Ouranos logo" width={100} height={100} />
      <SignOut iconOnly={true} />
    </div>
  );
}
