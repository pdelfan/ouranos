function SortReplyItemSkeleton() {
  return (
    <div className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 animate-pulse">
      <div className="w-8 h-6 rounded-full bg-gray-200" />
      <div className="w-1/3 h-6 rounded-full bg-gray-200" />
    </div>
  );
}

export default function ThreadPreferencesContainerSkeleton() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
        Thread Preferences
      </h2>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Sort Replies
        </h3>
        <section className="flex flex-col">
          <SortReplyItemSkeleton />
          <SortReplyItemSkeleton />
          <SortReplyItemSkeleton />
          <SortReplyItemSkeleton />
        </section>
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Prioritize Your Follows
        </h3>
        <section className="flex flex-col">
          <SortReplyItemSkeleton />
        </section>
      </section>
    </section>
  );
}
