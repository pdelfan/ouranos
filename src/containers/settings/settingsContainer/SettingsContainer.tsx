import Link from "next/link";
import { FaSlidersH } from "react-icons/fa";
import { ImBubbles2 } from "react-icons/im";
import {
  BiLogoGithub,
  BiSolidCheckCircle,
  BiSolidCloud,
  BiSolidEnvelope,
  BiSolidXCircle,
} from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { BiSolidBellOff } from "react-icons/bi";
import { BsPersonFillSlash } from "react-icons/bs";
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
      <h2 className="mx-3 mb-2 text-2xl font-semibold md:mx-0">Settings</h2>
      {profile && (
        <section>
          <h3 className="mx-3 mb-2 text-xl font-semibold md:mx-0">Account</h3>
          <div className="mt-2 flex w-full flex-col gap-3 rounded-none border border-x-0 p-3 md:rounded-b-2xl md:rounded-t-2xl md:border-x">
            <div className="flex flex-wrap items-center justify-between gap-3 ">
              <div className="flex gap-3">
                <Avatar src={profile.avatar} size="md" />
                <div className="flex flex-col">
                  <span className="line-clamp-1 shrink-0  break-all font-semibold text-neutral-700">
                    {profile.displayName || profile.handle}
                  </span>
                  <span className="line-clamp-1 shrink break-all font-medium text-neutral-400">
                    @{profile.handle}
                  </span>
                </div>
              </div>
              <SignOut />
            </div>
            <hr />
            <div className="flex flex-wrap items-center gap-2">
              <BiSolidEnvelope className="text-xl text-neutral-600" />
              <span className="break-all text-neutral-600">
                {session?.user.email}{" "}
              </span>
              {isEmailConfirmed && (
                <small className="inline-flex items-center gap-1 rounded-full bg-green-600/10 px-2 py-1.5 text-[0.6rem] font-bold text-green-600">
                  <BiSolidCheckCircle className="text-lg text-green-600" />
                  Verified
                </small>
              )}
              {!isEmailConfirmed && (
                <small className="inline-flex items-center gap-1 rounded-full bg-orange-600/10 px-2 py-1.5 text-[0.6rem] font-bold text-orange-600">
                  <BiSolidXCircle className="text-lg text-orange-600" />
                  Not Verified
                </small>
              )}
            </div>
          </div>
        </section>
      )}

      <section>
        <h3 className="mx-3 mb-2 text-xl font-semibold md:mx-0">
          Feeds and Threads
        </h3>
        <div className="flex flex-col">
          <Link
            href="/dashboard/settings/home-feed"
            className="flex items-center gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <FaSlidersH className="text-xl text-neutral-600" />
            Home Feed Preferences
          </Link>
          <Link
            href="/dashboard/settings/thread-preferences"
            className="flex items-center gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <ImBubbles2 className="text-xl text-neutral-600" />
            Thread Preferences
          </Link>
          <Link
            href="/dashboard/settings/my-feeds"
            className="flex items-center gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <BiSolidCloud className="text-xl text-neutral-600" />
            My Feeds
          </Link>
        </div>
      </section>

      <section>
        <h3 className="mx-3 mb-2 text-xl font-semibold md:mx-0">Moderation</h3>
        <section className="flex flex-col">
          <Link
            href="/dashboard/settings/content-filtering"
            className="flex items-center gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <MdRemoveRedEye className="text-xl text-neutral-600" />
            Content Filtering
          </Link>
          <Link
            href="/dashboard/settings/muted-users"
            className="flex items-center gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <BiSolidBellOff className="text-xl text-neutral-600" />
            Muted Users
          </Link>
          <Link
            href="/dashboard/settings/blocked-users"
            className="flex items-center gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <BsPersonFillSlash className="text-xl text-neutral-600" />
            Blocked Users
          </Link>
        </section>
      </section>
      <section>
        <h3 className="mx-3 mb-2 text-xl font-semibold md:mx-0">About</h3>
        <div className="flex flex-col">
          <Link
            href="https://github.com/pdelfan/ouranos"
            target="_blank"
            className="flex items-center gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <BiLogoGithub className="text-xl text-neutral-600" />
            GitHub Repository
          </Link>
          <Link
            href="https://github.com/pdelfan/ouranos/blob/main/LICENSE"
            target="_blank"
            className="flex items-center gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
          >
            <TbLicense className="text-xl text-neutral-600" />
            License
          </Link>
        </div>
      </section>
    </section>
  );
}
