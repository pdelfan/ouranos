"use client";

import UserStats from "@/components/dataDisplay/userStats/UserStats";
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
import UserActions from "@/components/dataDisplay/userActions/UserActions";
import ViewerInfo from "@/components/dataDisplay/viewerInfo/ViewerInfo";
import ProfileBio from "@/components/dataDisplay/profileBio/ProfileBio";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import EditProfile from "@/components/actions/editProfile/EditProfile";
import { isInvalidHandle } from "@/lib/utils/text";
import KnownFollowers from "@/components/dataDisplay/knownFollowers/KnownFollowers";
import JoinedDate from "@/components/dataDisplay/joinedDate/JoinedDate";

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
  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;
  const showImpersonationWarning =
    profile?.labels?.find((label) => label.val === "impersonation") &&
    contentFilter?.contentFilters.find((item) => item.type === "impersonation")
      ?.visibility === "warn";

  return (
    <>
      {(isLoading || (isFetching && !isRefetching)) && (
        <ProfileHeaderSkeleton />
      )}
      {profile && contentFilter && (
        <section className="border-skin-base overflow-hidden border-0 md:border-y border-b md:rounded-t-2xl md:border-x">
          <div className="relative">
            {isBlocked || hasBlockedYou ? (
              <Image
                src={profile?.banner ?? FallbackBanner}
                alt="Banner"
                width={800}
                height={192}
                priority
                className="h-40 object-cover opacity-30 contrast-75 md:h-48"
              />
            ) : (
              <Button
                onClick={() => setShowBanner(true)}
                className={`${
                  profile.banner
                    ? "cursor-pointer hover:brightness-90"
                    : "cursor-default"
                }`}
              >
                <Image
                  src={profile?.banner ?? FallbackBanner}
                  alt="Banner"
                  width={800}
                  height={192}
                  priority
                  className="h-40 object-cover md:h-48"
                />
              </Button>
            )}

            <div className="absolute bottom-0 translate-y-1/2 transform px-3">
              {isBlocked || hasBlockedYou ? (
                <Image
                  src={profile?.avatar ?? FallbackAvatar}
                  alt="Avatar"
                  width={95}
                  height={95}
                  className="bg-skin-base rounded-full border-4 border-transparent object-cover opacity-30 contrast-75"
                />
              ) : (
                <Button
                  className="bg-skin-base rounded-full border-4 border-transparent"
                  onClick={() => setShowAvatar(true)}
                >
                  <Image
                    src={
                      profile?.avatar?.replace("avatar", "avatar_thumbnail") ??
                      FallbackAvatar
                    }
                    alt="Avatar"
                    width={95}
                    height={95}
                    priority
                    className={`rounded-full object-cover ${
                      profile.avatar
                        ? "cursor-pointer hover:brightness-90"
                        : "cursor-default"
                    }`}
                  />
                </Button>
              )}
            </div>
          </div>
          {profile?.viewer && session?.user.handle && (
            <div className="mr-3 mt-3 flex">
              <div className="ml-auto flex gap-2">
                <UserActions
                  author={profile}
                  viewer={profile.viewer}
                  viewerHandle={session?.user.handle}
                  viewerDID={session?.user.id}
                />
                <Follow
                  onToggleFollow={toggleFollow}
                  author={profile}
                  viewer={profile.viewer}
                  viewerDID={session?.user.id}
                />
                {handle === session?.user.handle && (
                  <EditProfile profile={profile} />
                )}
              </div>
            </div>
          )}
          <div className="mx-3 mb-3 mt-1">
            <div className="flex flex-wrap items-center gap-x-2">
              <h1 className="text-skin-base break-all text-2xl font-semibold">
                {profile.displayName || profile.handle}
              </h1>
              <div className="flex flex-wrap gap-1.5">
                {profile.viewer?.followedBy && (
                  <ViewerInfo text="Follows you" />
                )}
              </div>
            </div>
            {isInvalidHandle(profile?.handle) ? (
              <ViewerInfo text="Invalid Handle" />
            ) : (
              <h2 className="text-skin-tertiary break-all font-medium">
                @{profile?.handle}
              </h2>
            )}

            {profile?.description && (
              <ProfileBio description={profile.description} />
            )}

            {profile.createdAt && (
              <div className="my-2">
                <JoinedDate date={new Date(profile.createdAt)} />
              </div>
            )}

            {profile?.handle && (
              <div className="mt-2">
                <UserStats
                  handle={profile?.handle}
                  followerCount={profile?.followersCount ?? 0}
                  followCount={profile?.followsCount ?? 0}
                  postsCount={profile.postsCount ?? 0}
                />
              </div>
            )}
            {!isBlocked &&
              profile?.handle &&
              profile.viewer?.knownFollowers &&
              profile.handle !== session?.user.handle && (
                <div className="mt-2">
                  <KnownFollowers handle={profile.handle} />
                </div>
              )}
            {showImpersonationWarning && (
              <div className="mt-2">
                <Alert
                  variant="warning"
                  message="This account may be an impersonation"
                />
              </div>
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
