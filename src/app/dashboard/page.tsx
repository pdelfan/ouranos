import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import TabItem from "@/components/navigational/tabs/TabItem";
import Tabs from "@/components/navigational/tabs/Tabs";
import { getSavedFeeds, getTimeline } from "@/lib/api/bsky/feed";

export default async function Dashboard() {
  const timeline = await getTimeline();
  const savedFeeds = await getSavedFeeds();

  return (
    <div>
      <div className="pt-2 border-x sm:border-t sm:rounded-t-2xl">
        <Tabs>
          {savedFeeds.map((feed) => (
            <TabItem
              key={feed.cid}
              isActive={feed.displayName === "For You"}
              label={feed.displayName}
              path={{
                pathname:
                  feed.displayName === "For You"
                    ? "/dashboard"
                    : `/dashboard/feeds/${encodeURIComponent(
                        feed.uri.split(":")[3].split("/")[0]
                      )}                    
                  )}`,
                query: {
                  uri: feed.uri,
                },
              }}
            />
          ))}
        </Tabs>
      </div>
      {timeline.data.feed &&
        timeline.data.feed.map((post, i) => (
          <FeedPost key={post.post.uri} post={post} />
        ))}
    </div>
  );
}
