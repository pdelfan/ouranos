"use client";

import FollowInfo from "@/components/dataDisplay/followInfo/FollowInfo";
import { getProfile } from "@/lib/api/bsky/actor";
import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import FallbackBanner from "@/assets/images/fallbackBanner.png";
import Image from "next/image";
import ProfileTabs from "@/components/navigational/profileTabs/ProfileTabs";
import Follow from "@/components/actions/follow/Follow";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import useAgent from "@/lib/hooks/useAgent";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";

interface Props {
  handle: string;
}
export default function ProfileHeader(props: Props) {
  const { handle } = props;
  const { data: session } = useSession();
  const agent = useAgent();
  const {
    data: profile,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["profile", handle],
    queryFn: () => getProfile(handle, agent),
  });

  return (
    <>
      {(isLoading || (isFetching && !isRefetching)) && (
        <ProfileHeaderSkeleton />
      )}
      {profile && (
        <section className="border sm:rounded-t-2xl overflow-hidden">
          <div className="relative">
            <Image
              src={profile?.banner ?? FallbackBanner}
              alt="Banner"
              width={700}
              height={100}
              className="object-cover min-h-[9rem]"
            />
            <div className="absolute bottom-0 transform translate-y-1/2 px-3">
              <Image
                src={profile?.avatar ?? FallbackAvatar}
                alt="Avatar"
                width={95}
                height={95}
                className="object-cover rounded-full border-4 border-white"
              />
            </div>
          </div>
          {profile?.viewer && session?.user.handle !== handle && (
            <div className="flex mr-3 mt-3">
              <div className="ml-auto">
                <Follow
                  viewer={profile.viewer}
                  userDID={profile.did}
                  userHandle={handle}
                />
              </div>
            </div>
          )}
          <div className={`p-4 ${session?.user.handle == handle && "mt-10"}`}>
            <h1 className="text-2xl font-semibold break-all">
              {profile?.displayName ||
                (profile?.handle && (profile?.displayName ?? profile?.handle))}
            </h1>
            <h2 className="text-neutral-400 font-medium break-all">
              @{profile?.handle}
            </h2>
            <p className="text-neutral-600 leading-5 mt-3 break-words">
              {profile?.description}
            </p>
            {profile?.handle && (
              <FollowInfo
                handle={profile?.handle}
                followersCount={profile?.followersCount ?? 0}
                followsCount={profile?.followsCount ?? 0}
              />
            )}
          </div>
          <ProfileTabs />
        </section>
      )}
    </>
  );
}
