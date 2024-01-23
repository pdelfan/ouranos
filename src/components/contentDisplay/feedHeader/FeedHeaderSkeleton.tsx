export default function FeedHeaderSkeleton() {
  return (
    <article className="flex flex-col gap-2 p-3 border border-y-0 border-x-0 md:border-t md:border-x md:rounded-t-2xl">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gray-200 h-[60px] w-[60px] animate-pulse" />
          <div className="flex flex-col gap-3">
            <div className="bg-gray-200 w-20 h-4 rounded animate-pulse" />
            <div className="bg-gray-200 w-32 h-4 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="bg-gray-200 w-9 h-9 rounded-lg animate-pulse" />
          <div className="bg-gray-200 w-9 h-9 rounded-lg animate-pulse" />
          <div className="bg-gray-200 w-9 h-9 rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="bg-gray-200 w-4/5 h-3 mt-2 rounded animate-pulse" />
      <div className="bg-gray-200 w-3/4 h-3 rounded animate-pulse" />
      <div className="bg-gray-200 w-5/6 h-3 rounded animate-pulse" />
      <div className="bg-gray-200 w-16 h-2 mt-2 rounded animate-pulse" />
    </article>
  );
}
