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
          <h2 className="text-2xl font-semibold">My Feeds</h2>
          <Link href="/dashboard/settings/my-feeds">
            <FaSlidersH className="text-xl text-neutral-500 hover:text-neutral-700" />
          </Link>
        </div>
        <Suspense fallback={<SavedFeedListSkeleton />}>
          <SavedFeedList />
        </Suspense>
      </section>
      <section>
        <div>
          <div className="mb-2 flex flex-wrap justify-between gap-x-12 gap-y-2">
            <h2 className="mx-3 mb-2 flex-auto text-2xl font-semibold md:mx-0">
              Popular Feeds
            </h2>
            <Search placeholder="Search for feeds" />
          </div>
          <Suspense key={query} fallback={<FeedListSkeleton />}>
            <FeedList query={query} />
          </Suspense>
        </div>
      </section>
    </section>
  );
}
