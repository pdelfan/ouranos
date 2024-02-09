import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";

export default function Loading() {
  return (
    <section>
      <div className="px-3 md:px-0">
        <h2 className="mb-2 text-2xl font-semibold">Following</h2>
        <div className="mb-2 h-4 w-1/3 animate-pulse rounded bg-neutral-200" />
      </div>
      <ProfileCardSkeleton />
    </section>
  );
}
