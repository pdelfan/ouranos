function SkeletonTest() {
  return (
    <div className="flex justify-between items-center gap-2 p-3 border border-x-0 md:border-x  first:border-t-0 last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 animate-pulse">
      <div className="flex items-start gap-3 w-full">
        <div className="flex-shrink-0 flex-grow-0 bg-gray-300 rounded-full w-12 h-12" />
        <div className="flex flex-col grow">
          <div className="flex gap-2">
            <div className="bg-gray-200 rounded w-1/4 h-4 mt-2" />
            <div className="bg-gray-200 rounded w-2/5 h-4 mt-2" />
          </div>
          <div className="bg-gray-200 rounded w-[90%] h-4 mt-2" />
          <div className="bg-gray-200 rounded w-[95%] h-4 mt-2" />
          <div className="bg-gray-200 rounded w-[88%] h-4 mt-2" />
          <div className="flex gap-x-5">
            <div className="bg-gray-200 rounded w-12 h-4 mt-4" />
            <div className="bg-gray-200 rounded w-12 h-4 mt-4" />
            <div className="bg-gray-200 rounded w-12 h-4 mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <article className="flex flex-col justify-between p-3 border border-x-0 md:border-x first:border-t last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 md:first:rounded-t-2xl">
      <div className="flex flex-wrap gap-2">
        <div className="bg-gray-200 rounded w-5 h-5" />
        <div className="flex flex-col gap-1 grow">
          <div className="bg-gray-300 rounded-full w-10 h-10" />
          <div className="flex flex-wrap gap-1 mt-2">
            <div className="bg-gray-200 rounded w-44 h-4 mb-1" />
            <div className="bg-gray-200 rounded w-16 h-4" />
            <div className="bg-gray-200 rounded w-10 h-4" />
          </div>
          <div className="bg-gray-200 rounded w-5/6 h-4" />
          <div className="bg-gray-200 rounded w-4/6 h-4" />
          <div className="bg-gray-200 rounded w-3/4 h-4" />
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
