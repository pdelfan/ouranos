import Link from "next/link";
import { FaSlidersH } from "react-icons/fa";
import { ImBubbles2 } from "react-icons/im";
import {
  BiLogoGithub,
  BiSolidCheckCircle,
  BiSolidEnvelope,
  BiSolidXCircle,
  BiSolidPalette,
  BiSolidPlanet,
} from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { BiSolidBellOff } from "react-icons/bi";
import { BsFillInfoCircleFill, BsPersonFillSlash } from "react-icons/bs";
import { TbLicense } from "react-icons/tb";
import { getSessionFromServer } from "@/lib/api/auth/session";
import { getProfile } from "@/lib/api/bsky/actor";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import SignOut from "@/components/actions/signOut/SignOut";

export default async function SettingsContainer() {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.handle);
  const isEmailConfirmed = session?.user.emailConfirmed ?? false;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        Settings
      </h2>
      {profile && (
        <section>
          <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
            Account
          </h3>
          <div className="border-skin-base mt-2 flex w-full flex-col gap-3 rounded-none border border-x-0 p-3 md:rounded-b-2xl md:rounded-t-2xl md:border-x">
            <div className="flex flex-wrap items-center justify-between gap-3 ">
              <Link
                href={`/dashboard/user/${profile.handle}`}
                className="flex gap-3"
              >
                <Avatar
                  src={profile.avatar?.replace("avatar", "avatar_thumbnail")}
                  size="md"
                />
                <div className="flex flex-col">
                  <span className="text-skin-base line-clamp-1  shrink-0 break-all font-semibold">
                    {profile.displayName || profile.handle}
                  </span>
                  <span className="text-skin-tertiary line-clamp-1 shrink break-all font-medium">
                    @{profile.handle}
                  </span>
                </div>
              </Link>
              <SignOut />
            </div>
            <hr className="border-skin-base" />
            <div className="flex flex-wrap items-center gap-2">
              <BiSolidEnvelope className="text-skin-icon-base text-xl" />
              <span className="text-skin-base break-all">
                {session?.user.email}{" "}
              </span>
              {isEmailConfirmed && (
                <small className="text-status-success bg-status-success/20 inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-[0.6rem] font-bold">
                  <BiSolidCheckCircle className="text-status-success text-lg" />
                  Verified
                </small>
              )}
              {!isEmailConfirmed && (
                <small className="text-status-warning bg-status-warning/20 inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-[0.6rem] font-bold">
                  <BiSolidXCircle className="text-status-warning text-lg" />
                  Not Verified
                </small>
              )}
            </div>
          </div>
        </section>
      )}

      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          General
        </h3>
        <div className="flex flex-col">
          <Link
            href="/dashboard/settings/appearance"
            className="border-skin-base text-skin-base hover:bg-skin-secondary flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <BiSolidPalette className="text-skin-icon-base text-xl" />
            Appearance
          </Link>
        </div>
      </section>

      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Feeds and Threads
        </h3>
        <div className="flex flex-col">
          <Link
            href="/dashboard/settings/home-feed"
            className="border-skin-base text-skin-base hover:bg-skin-secondary flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <FaSlidersH className="text-skin-icon-base text-xl" />
            Home Feed Preferences
          </Link>
          <Link
            href="/dashboard/settings/thread-preferences"
            className="border-skin-base text-skin-base hover:bg-skin-secondary flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <ImBubbles2 className="text-skin-icon-base text-xl" />
            Thread Preferences
          </Link>
          <Link
            href="/dashboard/settings/my-feeds"
            className="border-skin-base text-skin-base hover:bg-skin-secondary flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <BiSolidPlanet className="text-skin-icon-base text-xl" />
            My Feeds
          </Link>
        </div>
      </section>

      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Moderation
        </h3>
        <section className="flex flex-col">
          <Link
            href="/dashboard/settings/content-filtering"
            className="border-skin-base text-skin-base hover:bg-skin-secondary flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <MdRemoveRedEye className="text-skin-icon-base text-xl" />
            Content Filtering
          </Link>
          <Link
            href="/dashboard/settings/muted-users"
            className="border-skin-base text-skin-base hover:bg-skin-secondary flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <BiSolidBellOff className="text-skin-icon-base text-xl" />
            Muted Users
          </Link>
          <Link
            href="/dashboard/settings/blocked-users"
            className="border-skin-base text-skin-base hover:bg-skin-secondary flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <BsPersonFillSlash className="text-skin-icon-base text-xl" />
            Blocked Users
          </Link>
        </section>
      </section>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Learn More
        </h3>
        <div className="flex flex-col">
          <Link
            href="https://github.com/pdelfan/ouranos"
            target="_blank"
            className="border-skin-base text-skin-base hover:bg-skin-secondary flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <BiLogoGithub className="text-skin-icon-base text-xl" />
            GitHub Repository
          </Link>
          <Link
            href="https://github.com/pdelfan/ouranos/blob/main/LICENSE"
            target="_blank"
            className="border-skin-base text-skin-base hover:bg-skin-secondary flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <TbLicense className="text-skin-icon-base text-xl" />
            License
          </Link>
          <Link
            href="/about"
            target="_blank"
            className="border-skin-base text-skin-base hover:bg-skin-secondary flex items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <BsFillInfoCircleFill className="text-skin-icon-base text-xl" />
            About
          </Link>
        </div>
      </section>
    </section>
  );
}
