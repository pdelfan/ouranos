import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";

export default function Loading() {
  return (
    <section>
      <div className="px-3 md:px-0">
        <h2 className="text-2xl font-semibold mb-2">Blocked Users</h2>
      </div>
      <ProfileCardSkeleton />
    </section>
  );
}
