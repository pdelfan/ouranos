import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";

export default function Loading() {
  return (
    <section>
      <h2 className="text-2xl font-semibold px-3 sm:px-0 mb-2">Followers</h2>
      <div className="bg-neutral-200 animate-pulse w-1/3 h-4 mb-2 rounded" />
      <ProfileCardSkeleton />
    </section>
  );
}
