function TabSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-200 w-20 h-6 mx-2 rounded" />
    </div>
  );
}

export default function FeedTabsSkeleton() {
  return (
    <div className="flex flex-nowrap gap-3 px-4 py-3 overflow-auto no-scrollbar">
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
      <TabSkeleton />
    </div>
  );
}
