function TabSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-6 w-20 rounded bg-neutral-200" />
    </div>
  );
}

export default function FeedTabsSkeleton() {
  return (
    <div className="no-scrollbar flex flex-nowrap gap-6 overflow-auto p-3">
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
    </div>
  );
}
