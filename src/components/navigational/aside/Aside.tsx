import Avatar from "@/components/dataDisplay/avatar/Avatar";
import { getProfile } from "@/lib/api/bsky";
import { getSessionFromServer } from "@/app/api/auth/[...nextauth]/route";

export default async function Aside() {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.handle!);

  return (
    <aside>
      <div className="flex gap-3 items-center">
        <div className="flex flex-col items-end">
          <span className="font-semibold">{profile?.displayName}</span>
          <span className="font-medium text-neutral-500">
            @{profile?.handle}
          </span>
        </div>
        {profile?.avatar && <Avatar avatar={profile.avatar} />}
      </div>
    </aside>
  );
}
