import FeedList from "@/components/contentDisplay/feedList/FeedList";
import FeedListSkeleton from "@/components/contentDisplay/feedList/FeedListSkeleton";
import SavedFeedList from "@/components/contentDisplay/savedFeedList/SavedFeedList";
import SavedFeedListSkeleton from "@/components/contentDisplay/savedFeedList/SavedFeedListSkeleton";
import { Suspense } from "react";

export default async function Page() {  
  return (
    <section className="flex flex-col gap-5">
      <section>
        <h2 className="text-2xl font-semibold px-3 sm:px-0 mb-2">My feeds</h2>
        <Suspense fallback={<SavedFeedListSkeleton />}>
          <SavedFeedList />
        </Suspense>
      </section>
      <section>
        <h2 className="text-2xl font-semibold px-3 sm:px-0 mb-2">
          Popular feeds
        </h2>
        <Suspense fallback={<FeedListSkeleton />}>
          <FeedList />
        </Suspense>
      </section>
    </section>
  );
}
