import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";

export default function BlockedUsersContainerSkeleton() {
  return (
    <>
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        Blocked Users
      </h2>
      <ProfileCardSkeleton />
    </>
  );
}
