import FeedListSkeleton from "@/components/contentDisplay/feedList/FeedListSkeleton";
import SavedFeedListSkeleton from "@/components/contentDisplay/savedFeedList/SavedFeedListSkeleton";
import Search from "@/components/filter/search/Search";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <h2 className="text-2xl font-semibold mx-3 sm:mx-0 mb-2">My feeds</h2>
        <SavedFeedListSkeleton />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mx-3 sm:mx-0 mb-2">
          Popular feeds
        </h2>
        <div className="flex flex-col gap-2">
          <Search placeholder="Search for feeds" />
          <FeedListSkeleton />
        </div>
      </section>
    </section>
  );
}
