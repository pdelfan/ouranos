import { getPopularFeeds } from "@/lib/api/bsky/feed";
import FeedItem from "../feedItem/FeedItem";

export default async function FeedList() {
  const popularFeeds = await getPopularFeeds();
  return (
    <section className="flex flex-col">
      {popularFeeds &&
        popularFeeds.map((feed) => <FeedItem key={feed.cid} feedItem={feed} />)}
    </section>
  );
}
