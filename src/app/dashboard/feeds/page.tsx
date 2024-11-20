import FeedList from "@/components/contentDisplay/feedList/FeedList";
import FeedListSkeleton from "@/components/contentDisplay/feedList/FeedListSkeleton";
import SavedFeedList from "@/components/contentDisplay/savedFeedList/SavedFeedList";
import SavedFeedListSkeleton from "@/components/contentDisplay/savedFeedList/SavedFeedListSkeleton";
import Search from "@/components/filter/search/Search";
import Link from "next/link";
import { Suspense } from "react";
import { FaSlidersH } from "react-icons/fa";

interface Props {
  searchParams: {
    query?: string;
  };
}

export default function Page(props: Props) {
  const { searchParams } = props;
  const query = searchParams?.query || "";

  return (
    <section className="flex flex-col gap-5">
      <section>
        <div className="mx-3 mb-2 flex items-center justify-between md:mx-0">
          <h2 className="text-skin-base text-2xl font-semibold">My Feeds</h2>
          <Link
            href="/dashboard/settings/my-feeds"
            className="font-medium text-skin-base border border-skin-base bg-skin-secondary hover:brightness-95 px-3 py-1.5 rounded-xl"
          >
            Edit feeds
          </Link>
        </div>
        <Suspense fallback={<SavedFeedListSkeleton />}>
          <SavedFeedList />
        </Suspense>
      </section>
      <section>
        <div>
          <div className="mb-2 flex flex-wrap justify-between gap-x-12 gap-y-2">
            <h2 className="text-skin-base mx-3 mb-2 flex-auto text-2xl font-semibold md:mx-0">
              Discover Feeds
            </h2>
            <div className="mx-3 md:mx-0">
              <Search placeholder="Search for feeds" />
            </div>
          </div>
          <Suspense key={query} fallback={<FeedListSkeleton rounded={true} />}>
            <FeedList query={query} />
          </Suspense>
        </div>
      </section>
    </section>
  );
}
