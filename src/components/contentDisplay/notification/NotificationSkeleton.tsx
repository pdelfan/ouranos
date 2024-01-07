export function Skeleton() {
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
