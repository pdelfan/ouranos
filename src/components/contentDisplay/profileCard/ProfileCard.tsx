import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Link from "next/link";
import ViewerInfo from "@/components/dataDisplay/viewerInfo/ViewerInfo";
import { memo } from "react";
import { isInvalidHandle } from "@/lib/utils/text";

interface Props {
  profile: ProfileView;
  rounded?: boolean;
}

const ProfileCard = memo(function ProfileCard(props: Props) {
  const { profile, rounded = true } = props;

  return (
    <Link
      href={`/dashboard/user/${profile.handle}`}
      className={`border-skin-base border border-x-0 p-3 md:border-x ${
        rounded && "md:first:rounded-t-2xl"
      } hover:bg-skin-secondary last:border-b md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0`}
    >
      <article className="flex flex-col gap-2">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-wrap items-start gap-2">
            <Avatar
              src={profile.avatar?.replace("avatar", "avatar_thumbnail")}
            />
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-x-1.5">
                <h2 className="text-skin-base font-semibold">
                  {profile.displayName || profile.handle}
                </h2>
                {profile.viewer?.followedBy && (
                  <ViewerInfo text="Follows you" />
                )}
                {profile.viewer?.muted ||
                  (profile.viewer?.mutedByList && (
                    <ViewerInfo text="Muted user" />
                  ))}
              </div>

              {isInvalidHandle(profile?.handle) ? (
                <ViewerInfo text="Invalid Handle" />
              ) : (
                <h3 className="text-skin-tertiary break-all font-medium">
                  @{profile?.handle}
                </h3>
              )}
            </div>
          </div>
        </div>
        <div>
          {profile.description && (
            <p className="text-skin-base break-words leading-5">
              {profile.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
});

export default ProfileCard;
