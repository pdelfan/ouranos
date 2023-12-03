import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";

export default function BlockedUsersContainerSkeleton() {
  return (
    <>
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
        Blocked Users
      </h2>
      <ProfileCardSkeleton />
    </>
  );
}
