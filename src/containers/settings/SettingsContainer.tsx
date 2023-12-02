"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function SettingsContainer() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">Settings</h2>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Feeds and Threads
        </h3>
        <section className="flex flex-col">
          <Link
            href="/dashboard/settings/home-feed"
            className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
          >
            <Icon
              icon="heroicons:adjustments-horizontal-20-solid"
              className="text-neutral-600 text-xl"
            />
            Home Feed Preferences
          </Link>
          <Link
            href="/dashboard/settings/thread-preferences"
            className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
          >
            <Icon icon="raphael:chat" className="text-neutral-600 text-xl" />
            Thread Preferences
          </Link>
          <Link
            href="/dashboard/settings/my-feeds"
            className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
          >
            <Icon icon="bx:hash" className="text-neutral-600 text-xl" />
            My Feeds
          </Link>
        </section>
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Feeds and Threads
        </h3>
        <section className="flex flex-col">
          <Link
            href="/dashboard/settings/content-filtering"
            className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
          >
            <Icon icon="mdi:eye" className="text-neutral-600 text-xl" />
            Content Filtering
          </Link>
          <Link
            href="/dashboard/settings/muted-users"
            className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
          >
            <Icon icon="bxs:bell-off" className="text-neutral-600 text-xl" />
            Muted Users
          </Link>
          <Link
            href="/dashboard/settings/blocked-users"
            className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
          >
            <Icon
              icon="mdi:person-block"
              className="text-neutral-600 text-xl"
            />
            Blocked Users
          </Link>
        </section>
      </section>
    </section>
  );
}
