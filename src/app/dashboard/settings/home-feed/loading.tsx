import { HomeFeedItemSkeleton } from "@/containers/settings/HomeFeedContainer";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
        Home Feed Preferences
      </h2>

      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Replies
        </h3>
        <section className="flex flex-col">
          <HomeFeedItemSkeleton />
        </section>
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Replies by Unfollowed Users
        </h3>
        <section className="flex flex-col">
          <HomeFeedItemSkeleton />
        </section>
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Reposts
        </h3>
        <section className="flex flex-col">
          <HomeFeedItemSkeleton />
        </section>
      </section>
      <section>
        <h3 className="text-xl font-semibold mx-3 md:mx-0 mb-2">
          Hide Quote Posts
        </h3>
        <section className="flex flex-col">
          <HomeFeedItemSkeleton />
        </section>
      </section>
    </section>
  );
}
