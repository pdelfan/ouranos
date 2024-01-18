export default function AsideSkeleton() {
  return (
    <aside className="sticky h-full top-6 hidden md:block">
      <div className="flex flex-col gap-1 items-center lg:flex-row lg:gap-3">
        <div className="flex flex-col items-end order-last lg:order-first">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-20 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </aside>
  );
}
