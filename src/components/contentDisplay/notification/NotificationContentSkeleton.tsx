export default function NotificationContentSkeleton() {
  return (
    <div className="flex w-full items-start gap-3">
      <div className="flex grow flex-col">
        <div className="mt-2 h-4 w-[90%] rounded bg-neutral-200" />
        <div className="mt-2 h-4 w-[95%] rounded bg-neutral-200" />
        <div className="mt-2 h-4 w-[88%] rounded bg-neutral-200" />
      </div>
    </div>
  );
}
