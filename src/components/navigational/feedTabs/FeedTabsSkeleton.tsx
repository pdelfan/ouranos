function TabSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-skin-muted h-6 w-20 rounded" />
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
