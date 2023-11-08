function Skeleton() {
  return (
    <article className="p-3 border border-x-0 sm:border-x sm:first:rounded-t-2xl sm:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50">
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col">
            {/* Skeleton for Display Name & Handle */}
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
            <div className="w-24 h-4 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
        {/* <div className="w-24 h-10 bg-gray-200 rounded"></div> */}
      </div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mt-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
    </article>
  );
}

export default function SuggestionsListSkeleton() {
  return (
    <section className="flex flex-col">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </section>
  );
}
