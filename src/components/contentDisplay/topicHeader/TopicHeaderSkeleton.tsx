export default function TopicHeaderSkeleton() {
  return (
    <article className="border-skin-base flex flex-col gap-2 border border-x-0 border-y-0 p-3 md:rounded-t-2xl md:border-x md:border-t">
      <div className="bg-skin-muted h-80 w-full animate-pulse rounded-lg" />

      <div className="flex flex-wrap items-center gap-2 mt-2">
        <div className="bg-skin-muted h-8 w-8 animate-pulse rounded-full" />
        <div className="bg-skin-muted h-5 w-16 animate-pulse rounded" />
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <div className="bg-skin-muted h-6 w-3/4 animate-pulse rounded" />
        <div className="bg-skin-muted h-3 w-1/2 animate-pulse rounded mt-2" />
        <div className="bg-skin-muted h-3 w-1/3 animate-pulse rounded" />
      </div>
    </article>
  );
}
