export function Skeleton() {
  return (
    <article className="border-skin-base flex flex-col justify-between border border-x-0 p-3 first:border-t last:border-b md:border-x odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
      <div className="flex flex-wrap gap-2">
        <div className="bg-skin-muted h-5 w-5 rounded" />
        <div className="flex grow flex-col gap-1">
          <div className="bg-skin-muted h-10 w-10 rounded-full" />
          <div className="mt-2 flex flex-wrap gap-1">
            <div className="bg-skin-muted mb-1 h-4 w-44 rounded" />
            <div className="bg-skin-muted h-4 w-16 rounded" />
            <div className="bg-skin-muted h-4 w-10 rounded" />
          </div>
          <div className="bg-skin-muted h-4 w-5/6 rounded" />
          <div className="bg-skin-muted h-4 w-4/6 rounded" />
          <div className="bg-skin-muted h-4 w-3/4 rounded" />
        </div>
      </div>
    </article>
  );
}

export default function NotificationSkeleton() {
  return (
    <section className="flex flex-col">
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
