import Avatar from "@/components/dataDisplay/avatar/Avatar";
import { getProfile } from "@/lib/api/bsky";
import { getSessionFromServer } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Aside() {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.handle);

  return (
    <aside>
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-end">
          <span className="font-semibold">{profile?.displayName}</span>
          <Link
            href="api/auth/signout"
            className="font-medium text-neutral-500"
          >
            Sign out
          </Link>
        </div>
        <Avatar avatar={profile?.avatar} />
      </div>
    </aside>
  );
}
