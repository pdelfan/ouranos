function Skeleton() {
  return (
    <article className="flex flex-col gap-2 border p-3 last:border-b md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-neutral-200" />
        <div className="flex flex-col gap-3">
          <div className="h-3 w-20 rounded-full bg-neutral-200" />
          <div className="h-3 w-32 rounded-full bg-neutral-200" />
        </div>
      </div>
      <div className="mt-2 h-2 w-4/5 rounded-full bg-neutral-200" />
      <div className="h-2 w-3/4 rounded-full bg-neutral-200" />
      <div className="h-2 w-5/6 rounded-full bg-neutral-200" />
      <div className="mt-2 h-2 w-16 rounded-full bg-neutral-200" />
    </article>
  );
}

export default function FeedListSkeleton() {
  return (
    <section className="flex flex-col">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </section>
  );
}
