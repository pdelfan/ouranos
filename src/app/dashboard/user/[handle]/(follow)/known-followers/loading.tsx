import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";

export default function Loading() {
  return (
    <section>
      <div className="px-3 md:px-0">
        <h2 className="text-skin-base mb-2 text-2xl font-semibold">
          Followers you know
        </h2>
        <div className="bg-skin-muted mb-2 h-4 w-1/3 animate-pulse rounded" />
      </div>
      <ProfileCardSkeleton />
    </section>
  );
}
