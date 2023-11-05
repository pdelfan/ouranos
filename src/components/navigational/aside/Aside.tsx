import { getProfile } from "@/lib/api/bsky";
import { getSessionFromServer } from "@/app/api/auth/[...nextauth]/route";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import SignOut from "@/components/actions/signOut/SignOut";

export default async function Aside() {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.bskySession.handle);

  return (
    <aside>
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-end">
          <span className="font-semibold">{profile?.displayName}</span>
          <SignOut />
        </div>
        <Avatar avatar={profile?.avatar} />
      </div>
    </aside>
  );
}
