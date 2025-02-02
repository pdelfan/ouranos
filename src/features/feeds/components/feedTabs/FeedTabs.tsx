import { getSavedFeeds } from "@/lib/atproto/bsky/feed";
import { Tabs, TabsList, TabsTab } from "@mantine/core";

export default async function FeedTabs() {
  const savedFeeds = await getSavedFeeds({});
  const pinnedFeeds = savedFeeds.filter((feed) => feed.pinned);

  return (
    <Tabs defaultValue={"timeline"}>
      <TabsList>
        <TabsTab value={"timeline"} fw={600}>Following</TabsTab>
        {pinnedFeeds.map((feed) => (
          <TabsTab key={feed.uri} value={feed.uri} fw={600}>
            {feed.displayName}
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  );
}
