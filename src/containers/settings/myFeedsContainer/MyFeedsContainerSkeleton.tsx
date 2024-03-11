import SavedFeedListSkeleton from "@/components/contentDisplay/savedFeedList/SavedFeedListSkeleton";

export default function MyFeedsContainerSkeleton() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        My Feeds
      </h2>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Pinned Feeds
        </h3>
        <SavedFeedListSkeleton />
      </section>

      <section>
        <h2 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Saved Feeds
        </h2>
        <SavedFeedListSkeleton />
      </section>
    </section>
  );
}
