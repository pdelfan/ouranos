"use client";

import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Link from "next/link";

interface Props {
  profile: ProfileView;
}

export default function ProfileCard(props: Props) {
  const { profile } = props;

  return (
    <Link
      href={`/dashboard/user/${profile.handle}`}
      className="p-3 border border-x-0 sm:border-x sm:first:rounded-t-2xl sm:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
    >
      <article className="flex flex-col gap-2">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-wrap gap-2 items-center">
            <Avatar profile={profile} />
            <div className="flex flex-col">
              <h2 className="font-semibold">{profile?.displayName}</h2>
              <h3 className="text-neutral-400 font-medium break-all">
                @{profile?.handle}
              </h3>
            </div>
          </div>
          {/* Follow Button */}
        </div>
        <div>
          <p className="text-neutral-600 leading-5 break-words">
            {profile?.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
