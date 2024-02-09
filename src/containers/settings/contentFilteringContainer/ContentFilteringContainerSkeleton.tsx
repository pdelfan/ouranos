function HideAdultSwitchSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-2 rounded-none border border-x-0 p-3 md:rounded-2xl md:border-x">
      <div className="h-6 w-10 rounded-full bg-neutral-200" />
      <div className="h-6 w-8 rounded-full bg-neutral-200" />
    </div>
  );
}

function FilterTabItemSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
      <div className="flex grow flex-col gap-1">
        <div className="h-6 w-24 rounded-full bg-neutral-200" />
        <div className="h-6 w-2/5 rounded-full bg-neutral-200" />
      </div>
      <div className="h-9 w-32 rounded-full bg-neutral-200" />
    </div>
  );
}

export default function ContentFilteringContainerSkeleton() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="mx-3 mb-2 text-2xl font-semibold md:mx-0">
        Content Filtering
      </h2>
      <section>
        <h3 className="mx-3 mb-2 text-xl font-semibold md:mx-0">
          Hide Adult Content
        </h3>
        <HideAdultSwitchSkeleton />
      </section>
      <section>
        <h3 className="mx-3 mb-2 text-xl font-semibold md:mx-0">
          Adult Content Filters
        </h3>
        <div>
          <FilterTabItemSkeleton />
          <FilterTabItemSkeleton />
          <FilterTabItemSkeleton />
          <FilterTabItemSkeleton />
        </div>
      </section>
      <section>
        <h3 className="mx-3 mb-2 text-xl font-semibold md:mx-0">
          Other Filters
        </h3>
        <div>
          <FilterTabItemSkeleton />
          <FilterTabItemSkeleton />
          <FilterTabItemSkeleton />
        </div>
      </section>
    </section>
  );
}
