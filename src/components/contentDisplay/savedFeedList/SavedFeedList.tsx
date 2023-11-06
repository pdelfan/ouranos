import SavedFeedItem from "../savedFeedItem/SavedFeedItem";
import { getSavedFeeds } from "@/lib/api/bsky/feed";

export default async function SavedFeedList() {
  const savedFeeds = await getSavedFeeds();

  return (
    <section className="flex flex-col">
      {savedFeeds &&
        savedFeeds
          .sort((feed) => (feed.pinned ? -1 : 1))
          .map((feed) => <SavedFeedItem key={feed.cid} feedItem={feed} />)}
    </section>
  );
}
