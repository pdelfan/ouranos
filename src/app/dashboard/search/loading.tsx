import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import Search from "@/components/filter/search/Search";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <div className="mx-3 mb-2 flex items-center justify-between md:mx-0">
          <h2 className="text-skin-base text-2xl font-semibold">Search</h2>
          <div className="bg-skin-muted h-5 w-5 rounded-lg" />
        </div>
        <div className="mx-3 md:mx-0">
          <Search placeholder="Search for users or posts" />
        </div>
      </section>

      <section>
        <h2 className="text-skin-base mb-2 px-3 text-2xl font-semibold md:px-0">
          Who to follow
        </h2>
        <ProfileCardSkeleton />
      </section>
    </section>
  );
}
