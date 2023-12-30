"use client";

function SettingsItemSkeleton() {
  return (
    <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 animate-pulse">
      <div className="w-8 h-6 rounded-full bg-gray-200" />
      <div className="w-1/3 h-6 rounded-full bg-gray-200" />
    </div>
  );
}

function AccountSkeleton() {
  return (
    <section>
      <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">Account</h3>
      <div className="w-1/2 h-4 bg-gray-200 mx-3 md:mx-0 mb-2 rounded-full" />
      <section className="flex flex-wrap gap-3 justify-between items-center mx-3 md:mx-0">
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 rounded-full w-12 h-12" />
          <div className="flex flex-col gap-2">
            <div className="w-20 h-4 rounded-full bg-gray-200" />
            <div className="w-24 h-4 rounded-full bg-gray-200" />
          </div>
        </div>
        <div className="bg-gray-200 rounded-full w-16 h-4" />
      </section>
    </section>
  );
}

export default function SettingsContainerSkeleton() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">Settings</h2>
      <AccountSkeleton />
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Feeds and Threads
        </h3>
        <section className="flex flex-col">
          <SettingsItemSkeleton />
          <SettingsItemSkeleton />
          <SettingsItemSkeleton />
        </section>
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">Moderation</h3>
        <section className="flex flex-col">
          <SettingsItemSkeleton />
          <SettingsItemSkeleton />
          <SettingsItemSkeleton />
        </section>
      </section>
    </section>
  );
}
