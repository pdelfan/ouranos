import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";

export default function MutedUsersContainerSkeleton() {
  return (
    <>
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        Muted Users
      </h2>
      <ProfileCardSkeleton />
    </>
  );
}
