import Image from "next/image";
import SkeletonBanner from "@/assets/images/skeletonBanner.png";

function Skeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-200 w-20 h-8 rounded" />
    </div>
  );
}

function TabsSkeleton() {
  return (
    <div className="flex flex-nowrap gap-6 px-3 mt-5 overflow-auto no-scrollbar">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}

export default function ProfileHeaderSkeleton() {
  return (
    <section className="md:border md:rounded-t-2xl overflow-hidden animate-pulse">
      <div className="relative">
        <Image
          src={SkeletonBanner}
          alt="Banner"
          width={800}
          height={191}
          className="object-cover h-[12rem] animate-pulse"
        />
        <div className="absolute bottom-0 transform translate-y-1/2 px-3">
          <div className="w-[103px] h-[103px] bg-gray-200 rounded-full border-4 border-white" />
        </div>
      </div>
      <div className="flex mr-3 mt-3">
        <div className="flex gap-2 ml-auto">
          <div className="h-9 w-9 bg-gray-200 rounded-full" />
          <div className="h-9 bg-gray-200 rounded-full w-[100px]" />
        </div>
      </div>

      <div className="p-3">
        <div className="h-6 bg-gray-200 rounded w-2/6 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-5" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="h-3 bg-gray-200 rounded w-1/3 my-3" />
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="h-4 bg-gray-200 rounded w-8" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
          <div className="flex gap-1">
            <div className="h-4 bg-gray-200 rounded w-8" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
      <TabsSkeleton />
    </section>
  );
}
