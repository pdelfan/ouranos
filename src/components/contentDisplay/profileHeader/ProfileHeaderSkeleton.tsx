import Image from "next/image";
import SkeletonBanner from "@/assets/images/skeletonBanner.png";

function Skeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-8 w-20 rounded bg-neutral-200" />
    </div>
  );
}

export function TabsSkeleton() {
  return (
    <div className="no-scrollbar mt-5 flex flex-nowrap gap-6 overflow-auto px-3">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}

export default function ProfileHeaderSkeleton() {
  return (
    <section className="animate-pulse overflow-hidden md:rounded-t-2xl md:border">
      <div className="relative">
        <Image
          src={SkeletonBanner}
          alt="Banner"
          width={800}
          height={192}
          className="h-40 animate-pulse object-cover md:h-48"
        />
        <div className="absolute bottom-0 translate-y-1/2 transform px-3">
          <div className="h-[103px] w-[103px] rounded-full border-4 border-white bg-neutral-200" />
        </div>
      </div>
      <div className="mr-3 mt-3 flex">
        <div className="ml-auto flex gap-2">
          <div className="h-9 w-9 rounded-full bg-neutral-200" />
          <div className="h-9 w-[100px] rounded-full bg-neutral-200" />
        </div>
      </div>

      <div className="p-3">
        <div className="mb-2 h-6 w-2/6 rounded bg-neutral-200" />
        <div className="mb-5 h-4 w-1/2 rounded bg-neutral-200" />
        <div className="mb-2 h-4 w-full rounded bg-neutral-200" />
        <div className="mb-4 h-4 w-2/3 rounded bg-neutral-200" />
        <div className="my-3 h-3 w-1/3 rounded bg-neutral-200" />
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="h-4 w-8 rounded bg-neutral-200" />
            <div className="h-4 w-16 rounded bg-neutral-200" />
          </div>
          <div className="flex gap-1">
            <div className="h-4 w-8 rounded bg-neutral-200" />
            <div className="h-4 w-16 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
      <TabsSkeleton />
    </section>
  );
}
