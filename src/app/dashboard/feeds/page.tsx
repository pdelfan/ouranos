import FeedList from "@/components/contentDisplay/feedList/FeedList";
import { getPopularFeeds } from "@/lib/api/bsky/feed";

export default async function Page() {
  const popularFeeds = await getPopularFeeds();
  return (
    <section>
      <FeedList popular={popularFeeds} />
    </section>
  );
}
