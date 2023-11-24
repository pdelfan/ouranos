"use client";

import FollowInfo from "@/components/dataDisplay/followInfo/FollowInfo";
import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import FallbackBanner from "@/assets/images/fallbackBanner.png";
import Image from "next/image";
import ProfileTabs from "@/components/navigational/profileTabs/ProfileTabs";
import Follow from "@/components/actions/follow/Follow";
import { useSession } from "next-auth/react";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";
import { useState } from "react";
import Button from "@/components/actions/button/Button";
import Gallery from "@/components/dataDisplay/gallery/Gallery";
import Alert from "@/components/feedback/alert/Alert";
import useProfile from "@/lib/hooks/bsky/actor/useProfile";

interface Props {
  handle: string;
}

export default function ProfileHeader(props: Props) {
  const { handle } = props;
  const [showAvatar, setShowAvatar] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const { data: session } = useSession();
  const {
    data: profile,
    isLoading,
    isFetching,
    isRefetching,
    toggleFollow,
  } = useProfile(handle);
  const isBlocked = profile?.viewer?.blocking ? true : false;
  const hasBlockedYou = profile?.viewer?.blockedBy ? true : false;
  const isMuted = profile?.viewer?.muted ? true : false;

  return (
    <>
      {(isLoading || (isFetching && !isRefetching)) && (
        <ProfileHeaderSkeleton />
      )}
      {profile && (
        <section className="border border-x-0 sm:border-x sm:rounded-t-2xl overflow-hidden">
          <div className="relative">
            {profile.banner ? (
              <Button
                className="hover:brightness-90"
                disabled={isBlocked || hasBlockedYou}
                onClick={() => setShowBanner(true)}
              >
                <Image
                  src={profile?.banner ?? FallbackBanner}
                  alt="Banner"
                  width={700}
                  height={100}
                  className="object-cover min-h-[9rem]"
                />
              </Button>
            ) : (
              <Image
                src={profile?.banner ?? FallbackBanner}
                alt="Banner"
                width={700}
                height={100}
                className="object-cover min-h-[9rem]"
              />
            )}

            <div className="absolute bottom-0 transform translate-y-1/2 px-3">
              {profile.avatar ? (
                <Button
                  className="hover:brightness-90"
                  disabled={isBlocked || hasBlockedYou}
                  onClick={() => setShowAvatar(true)}
                >
                  <Image
                    src={profile?.avatar ?? FallbackAvatar}
                    alt="Avatar"
                    width={95}
                    height={95}
                    className="object-cover rounded-full border-4 border-white"
                  />
                </Button>
              ) : (
                <Image
                  src={profile?.avatar ?? FallbackAvatar}
                  alt="Avatar"
                  width={95}
                  height={95}
                  className="object-cover rounded-full border-4 border-white"
                />
              )}
            </div>
          </div>
          {profile?.viewer && session?.user.handle !== handle && (
            <div className="flex mr-3 mt-3">
              <div className="ml-auto">
                <Follow viewer={profile.viewer} onToggleFollow={toggleFollow} />
              </div>
            </div>
          )}
          <div className={`p-3 ${session?.user.handle == handle && "mt-10"}`}>
            <div className="flex flex-wrap items-center gap-x-2">
              <h1 className="text-2xl font-semibold break-all">
                {profile?.displayName ||
                  (profile?.handle &&
                    (profile?.displayName ?? profile?.handle))}
              </h1>
              {profile.viewer?.followedBy && (
                <small className="bg-neutral-200 text-neutral-500 font-medium py-0.5 px-1 rounded">
                  Follows you
                </small>
              )}
            </div>
            <h2 className="text-neutral-400 font-medium break-all">
              @{profile?.handle}
            </h2>
            <p className="text-neutral-600 leading-5 mt-3 break-words whitespace-pre-wrap">
              {profile?.description}
            </p>
            {profile?.handle && (
              <FollowInfo
                handle={profile?.handle}
                followersCount={profile?.followersCount ?? 0}
                followsCount={profile?.followsCount ?? 0}
              />
            )}
            {isMuted && (
              <div className="mt-2">
                <Alert variant="warning" message="You have muted this user" />
              </div>
            )}
            {isBlocked && (
              <div className="mt-2">
                <Alert variant="error" message="You have blocked this user" />
              </div>
            )}
            {hasBlockedYou && (
              <div className="mt-2">
                <Alert
                  variant="error"
                  message="You have been blocked by this user"
                />
              </div>
            )}
          </div>

          {!hasBlockedYou && <ProfileTabs />}

          {showAvatar && profile.avatar && (
            <Gallery
              images={profile.avatar}
              onClose={() => setShowAvatar(false)}
            />
          )}
          {showBanner && profile.banner && (
            <Gallery
              images={profile.banner}
              onClose={() => setShowBanner(false)}
            />
          )}
        </section>
      )}
    </>
  );
}
