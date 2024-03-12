function Skeleton() {
  return (
    <article className="border-skin-base flex flex-col gap-2 border p-3 last:border-b md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
      <div className="flex flex-wrap items-center gap-3">
        <div className="bg-skin-muted h-10 w-10 rounded-lg" />
        <div className="flex flex-col gap-3">
          <div className="bg-skin-muted h-3 w-20 rounded-full" />
          <div className="bg-skin-muted h-3 w-32 rounded-full" />
        </div>
      </div>
      <div className="bg-skin-muted mt-2 h-2 w-4/5 rounded-full" />
      <div className="bg-skin-muted h-2 w-3/4 rounded-full" />
      <div className="bg-skin-muted h-2 w-5/6 rounded-full" />
      <div className="bg-skin-muted mt-2 h-2 w-16 rounded-full" />
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
