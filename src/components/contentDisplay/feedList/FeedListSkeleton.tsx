function Skeleton() {
  return (
    <article className="flex flex-col gap-2 p-3 border md:first:rounded-t-2xl md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="rounded-lg bg-gray-200 h-10 w-10" />
        <div className="flex flex-col gap-3">
          <div className="bg-gray-200 w-20 h-3" />
          <div className="bg-gray-200 w-32 h-3" />
        </div>
      </div>
      <div className="bg-gray-200 w-4/5 h-2 mt-2" />
      <div className="bg-gray-200 w-3/4 h-2" />
      <div className="bg-gray-200 w-5/6 h-2" />
      <div className="bg-gray-200 w-16 h-2 mt-2" />
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
