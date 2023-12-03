function HideAdultSwitchSkeleton() {
  return (
    <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 animate-pulse">
      <div className="w-10 h-6 rounded-full bg-gray-200" />
      <div className="w-8 h-6 rounded-full bg-gray-200" />
    </div>
  );
}

function FilterTabItemSkeleton() {
  return (
    <div className="flex flex-wrap justify-between items-center gap-3 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
      <div className="flex flex-col gap-1 grow">
        <div className="w-24 h-6 rounded-full bg-gray-200" />
        <div className="w-2/5 h-6 rounded-full bg-gray-200" />
      </div>
      <div className="w-32 h-9 rounded-full bg-gray-200" />
    </div>
  );
}

export default function ContentFilteringContainerSkeleton() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
        Content Filtering
      </h2>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Adult Content
        </h3>
        <HideAdultSwitchSkeleton />
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
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
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
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
