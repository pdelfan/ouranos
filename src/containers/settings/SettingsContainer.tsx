"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function SettingsContainer() {
  return (
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
      <Link
        href="/dashboard/settings/moderation"
        className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
      >
        <Icon icon="mdi:person-block" className="text-neutral-600 text-xl" />
        Moderation
      </Link>
    </section>
  );
}
