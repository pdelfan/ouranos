import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";

export default function MutedUsersContainerSkeleton() {
  return (
    <>
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">Muted Users</h2>
      <ProfileCardSkeleton />
    </>
  );
}
