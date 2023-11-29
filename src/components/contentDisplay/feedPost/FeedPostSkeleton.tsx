function Skeleton() {
  return (
    <div className="flex justify-between items-center gap-2 p-3 border border-x-0 sm:border-x  last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 animate-pulse">
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

export default function FeedPostSkeleton() {
  return (
    <div className="first:border-t-0">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
