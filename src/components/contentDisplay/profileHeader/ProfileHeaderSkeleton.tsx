export default function ProfileHeaderSkeleton() {
  return (
    <section className="border sm:rounded-2xl overflow-hidden animate-pulse">
      <div className="relative bg-gray-300 h-48">
        <div className="w-full h-full"></div>
        <div className="absolute bottom-0 transform translate-y-1/2 px-4">
          <div className="w-[95px] h-[95px] bg-gray-200 rounded-full border-4 border-white"></div>
        </div>
      </div>

      <div className="p-5 mt-10">
        <div className="h-6 bg-gray-200 rounded w-2/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-5"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="flex items-center mt-3 gap-3">
          <div className="flex gap-1">
            <div className="h-4 bg-gray-200 rounded w-8"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex gap-1">
            <div className="h-4 bg-gray-200 rounded w-8"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
