import SavedFeedListSkeleton from "@/components/contentDisplay/savedFeedList/SavedFeedListSkeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      <section>
        <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
          Pinned Feeds
        </h2>
        <SavedFeedListSkeleton />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
          Saved Feeds
        </h2>
        <SavedFeedListSkeleton />
      </section>
    </section>
  );
}
