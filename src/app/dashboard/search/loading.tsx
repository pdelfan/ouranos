import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import Search from "@/components/filter/search/Search";
import { BiSolidHelpCircle } from "react-icons/bi";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <div className="mx-3 mb-2 flex items-center justify-between md:mx-0">
          <h2 className="text-skin-base text-2xl font-semibold">Search</h2>
          <BiSolidHelpCircle className="text-skin-icon-muted text-2xl" />
        </div>
        <Search placeholder="Search for users or posts" />
      </section>

      <section>
        <h2 className="text-skin-base mb-2 px-3 text-2xl font-semibold md:px-0">
          Suggestion
        </h2>
        <ProfileCardSkeleton />
      </section>
    </section>
  );
}
