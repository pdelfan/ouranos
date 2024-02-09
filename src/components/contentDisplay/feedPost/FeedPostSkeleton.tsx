export function Skeleton() {
  return (
    <div className="flex animate-pulse items-center justify-between gap-2 border border-x-0 p-3  last:border-b md:border-x odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
      <div className="flex w-full items-start gap-3">
        <div className="h-12 w-12 flex-shrink-0 flex-grow-0 rounded-full bg-neutral-300" />
        <div className="flex grow flex-col">
          <div className="flex gap-2">
            <div className="mt-2 h-4 w-1/4 rounded bg-neutral-200" />
            <div className="mt-2 h-4 w-2/5 rounded bg-neutral-200" />
          </div>
          <div className="mt-2 h-4 w-[90%] rounded bg-neutral-200" />
          <div className="mt-2 h-4 w-[95%] rounded bg-neutral-200" />
          <div className="mt-2 h-4 w-[88%] rounded bg-neutral-200" />
          <div className="flex gap-x-5">
            <div className="mt-4 h-4 w-12 rounded bg-neutral-200" />
            <div className="mt-4 h-4 w-12 rounded bg-neutral-200" />
            <div className="mt-4 h-4 w-12 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeedPostSkeleton() {
  return (
    <div>
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
