export default function ListHeaderSkeleton() {
  return (
    <article className="flex flex-col gap-2 border border-x-0 border-y-0 p-3 md:rounded-t-2xl md:border-x md:border-t">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-skin-muted h-[60px] w-[60px] animate-pulse rounded-lg" />
          <div className="flex flex-col gap-3">
            <div className="bg-skin-muted h-4 w-20 animate-pulse rounded" />
            <div className="bg-skin-muted h-4 w-32 animate-pulse rounded" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="bg-skin-muted h-9 w-9 animate-pulse rounded-lg" />
        </div>
      </div>
      <div className="bg-skin-muted mt-2 h-3 w-4/5 animate-pulse rounded" />
      <div className="bg-skin-muted h-3 w-3/4 animate-pulse rounded" />
      <div className="bg-skin-muted h-3 w-5/6 animate-pulse rounded" />
    </article>
  );
}
