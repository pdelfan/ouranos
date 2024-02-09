import FeedListSkeleton from "@/components/contentDisplay/feedList/FeedListSkeleton";
import SavedFeedListSkeleton from "@/components/contentDisplay/savedFeedList/SavedFeedListSkeleton";
import Search from "@/components/filter/search/Search";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <div className="mx-3 mb-2 flex items-center justify-between md:mx-0">
          <h2 className="text-2xl font-semibold">My Feeds</h2>
          <div className="h-5 w-5 rounded-lg bg-neutral-200" />
        </div>
        <SavedFeedListSkeleton />
      </section>
      <section>
        <div>
          <div className="mb-2 flex flex-wrap justify-between gap-x-12 gap-y-2">
            <h2 className="mx-3 mb-2 flex-auto text-2xl font-semibold md:mx-0">
              Popular Feeds
            </h2>
            <Search placeholder="Search for feeds" />
          </div>
          <FeedListSkeleton />
        </div>
      </section>
    </section>
  );
}
