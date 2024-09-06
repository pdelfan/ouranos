"use client";

function SettingsItemSkeleton() {
  return (
    <div className="border-skin-base flex animate-pulse items-center gap-2 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
      <div className="bg-skin-muted h-6 w-8 rounded-full" />
      <div className="bg-skin-muted h-6 w-1/3 rounded-full" />
    </div>
  );
}

function AccountSkeleton() {
  return (
    <section>
      <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
        Account
      </h3>
      <section className="border-skin-base mt-2 flex w-full flex-col gap-3 rounded-none border border-x-0 p-3 md:rounded-b-2xl md:rounded-t-2xl md:border-x">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-skin-muted h-12 w-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <div className="bg-skin-muted h-4 w-20 rounded-full" />
              <div className="bg-skin-muted h-4 w-24 rounded-full" />
            </div>
          </div>
          <div className="bg-skin-muted h-4 w-16 rounded-full" />
        </div>
        <hr className="border-skin-base" />
        <div className="bg-skin-muted h-4 w-1/2 rounded-full" />
      </section>
    </section>
  );
}

export default function SettingsContainerSkeleton() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        Settings
      </h2>
      <AccountSkeleton />

      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          General
        </h3>
        <section className="flex flex-col">
          <SettingsItemSkeleton />
        </section>
      </section>

      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Feeds and Threads
        </h3>
        <section className="flex flex-col">
          <SettingsItemSkeleton />
          <SettingsItemSkeleton />
          <SettingsItemSkeleton />
        </section>
      </section>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Moderation
        </h3>
        <section className="flex flex-col">
          <SettingsItemSkeleton />
          <SettingsItemSkeleton />
          <SettingsItemSkeleton />
        </section>
      </section>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Learn More
        </h3>
        <section className="flex flex-col">
          <SettingsItemSkeleton />
          <SettingsItemSkeleton />
          <SettingsItemSkeleton />
        </section>
      </section>
    </section>
  );
}
