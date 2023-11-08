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
        <div>
          <div className="flex flex-wrap justify-between gap-x-12 gap-y-2 mb-2">
            <h2 className="flex-auto text-2xl font-semibold mx-3 sm:mx-0 mb-2">
              Popular feeds
            </h2>
            <Search placeholder="Search for feeds" />
          </div>
          <FeedListSkeleton />
        </div>
      </section>
    </section>
  );
}
