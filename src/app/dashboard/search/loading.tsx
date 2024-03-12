import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import Search from "@/components/filter/search/Search";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <h2 className="text-skin-base mb-2 px-3 text-2xl font-semibold md:px-0">
          Search
        </h2>
        <Search placeholder="Search for users or posts" />
      </section>

      <section>
        <h2 className="text-skin-base mb-2 px-3 text-2xl font-semibold md:px-0">
          Suggestions
        </h2>
        <ProfileCardSkeleton />
      </section>
    </section>
  );
}
