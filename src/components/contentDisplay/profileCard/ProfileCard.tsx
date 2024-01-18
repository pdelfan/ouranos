import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Link from "next/link";
import ViewerInfo from "@/components/dataDisplay/viewerInfo/ViewerInfo";

interface Props {
  profile: ProfileView;
  rounded?: boolean;
}

export default function ProfileCard(props: Props) {
  const { profile, rounded = true } = props;

  return (
    <Link
      href={`/dashboard/user/${profile.handle}`}
      className={`p-3 border border-x-0 md:border-x ${
        rounded && "md:first:rounded-t-2xl"
      } md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50`}
    >
      <article className="flex flex-col gap-2">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-wrap gap-2 items-start">
            <Avatar profile={profile} />
            <div className="flex flex-col">
              <h2 className="font-semibold">
                {profile?.displayName ?? profile.handle}
              </h2>
              <h3 className="text-neutral-400 font-medium break-all">
                @{profile?.handle}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.viewer?.followedBy && (
                  <ViewerInfo text="Follows you" />
                )}
                {profile.viewer?.muted ||
                  (profile.viewer?.mutedByList && (
                    <ViewerInfo text="Muted user" />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-neutral-700 leading-5 break-words">
            {profile?.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
