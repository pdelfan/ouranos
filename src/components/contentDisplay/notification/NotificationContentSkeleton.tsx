export default function NotificationContentSkeleton() {
  return (
    <div className="flex items-start gap-3 w-full">
      <div className="flex flex-col grow">
        <div className="bg-gray-200 rounded w-[90%] h-4 mt-2" />
        <div className="bg-gray-200 rounded w-[95%] h-4 mt-2" />
        <div className="bg-gray-200 rounded w-[88%] h-4 mt-2" />
      </div>
    </div>
  );
}
