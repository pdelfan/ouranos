import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Link from "next/link";
import ViewerInfo from "@/components/dataDisplay/viewerInfo/ViewerInfo";
import { memo } from "react";

interface Props {
  profile: ProfileView;
  rounded?: boolean;
}

const ProfileCard = memo(function ProfileCard(props: Props) {
  const { profile, rounded = true } = props;

  return (
    <Link
      href={`/dashboard/user/${profile.handle}`}
      className={`border border-x-0 p-3 md:border-x ${
        rounded && "md:first:rounded-t-2xl"
      } last:border-b hover:bg-neutral-50 md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0`}
    >
      <article className="flex flex-col gap-2">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-wrap items-start gap-2">
            <Avatar src={profile.avatar} />
            <div className="flex flex-col">
              <h2 className="font-semibold">
                {profile?.displayName ?? profile.handle}
              </h2>
              <h3 className="break-all font-medium text-neutral-400">
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
          {profile.description && (
            <p className="break-words leading-5 text-neutral-700">
              {profile.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
});

export default ProfileCard;
