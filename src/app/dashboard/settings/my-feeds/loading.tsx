import SavedFeedListSkeleton from "@/components/contentDisplay/savedFeedList/SavedFeedListSkeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">My Feeds</h2>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Pinned Feeds
        </h3>
        <SavedFeedListSkeleton />
      </section>

      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">Saved Feeds</h3>
        <SavedFeedListSkeleton />
      </section>
    </section>
  );
}
