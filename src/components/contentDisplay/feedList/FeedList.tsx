import FeedItem from "../feedItem/FeedItem";
import { getPopularFeeds, getSavedFeeds } from "@/lib/api/bsky/feed";

export default async function FeedList() {
  const savedFeeds = await getSavedFeeds();
  const popularFeeds = await getPopularFeeds();

  return (
    <section className="flex flex-col">
      {popularFeeds &&
        popularFeeds.map((feed) => (
          <FeedItem
            key={feed.cid}
            feedItem={feed}
            saved={savedFeeds.some((savedFeed) => savedFeed.uri === feed.uri)}
          />
        ))}
    </section>
  );
}
