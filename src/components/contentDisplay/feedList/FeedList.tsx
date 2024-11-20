import FeedItem from "../feedItem/FeedItem";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { getPopularFeeds, getSavedFeeds } from "@/lib/api/bsky/feed";

interface Props {
  query: string;
}

export default async function FeedList(props: Props) {
  const { query } = props;
  const savedFeeds = await getSavedFeeds();
  const popularFeeds = await getPopularFeeds(query);

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
      {popularFeeds.length === 0 && (
        <div className="border-skin-base border-t">
          <FeedAlert variant="empty" message="No feeds found" />
        </div>
      )}
    </section>
  );
}
