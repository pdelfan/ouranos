function Skeleton() {
  return (
    <article className="animate-pulse flex justify-between items-center gap-2 p-3 border md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="rounded-lg bg-gray-200 h-10 w-10" />
        <div className="bg-gray-200 rounded-full w-32 h-4" />
      </div>
    </article>
  );
}

export default function SavedFeedListSkeleton() {
  return (
    <section className="flex flex-col">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </section>
  );
}
