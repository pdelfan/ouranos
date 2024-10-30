export default function TopicHeaderSkeleton() {
  return (
    <article className="border-skin-base flex flex-col gap-2 border border-x-0 border-y-0 pb-3 md:border-x md:border-t">
      <div className="bg-skin-muted h-80 w-full animate-pulse" />
      <div className="flex flex-col gap-1 p-3">
        <div className="bg-skin-muted h-4 w-1/4 animate-pulse rounded" />
        <div className="bg-skin-muted h-6 w-3/4 animate-pulse rounded" />
        <div className="bg-skin-muted h-6 w-2/4 animate-pulse rounded" />
        <div className="bg-skin-muted h-3 w-1/2 animate-pulse rounded mt-2" />
        <div className="bg-skin-muted h-3 w-1/3 animate-pulse rounded" />
      </div>
    </article>
  );
}
