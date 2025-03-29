"use client";

import { Tabs, TabsList, TabsTab, Text } from "@mantine/core";
import useSavedFeeds from "../../lib/queries/useSavedFeeds";

export default function FeedTabs() {
  const { savedFeeds, isLoading } = useSavedFeeds();
  const pinnedFeeds = savedFeeds?.filter((feed) => feed.pinned);

  if (isLoading || !pinnedFeeds) {
    return <>Loading feeds</>;
  }

  return (
    <Tabs defaultValue={"timeline"}>
      <TabsList>
        <TabsTab value={"timeline"} fw={600}>
          Following
        </TabsTab>
        {pinnedFeeds.map((feed) => (
          <TabsTab key={feed.uri} value={feed.uri} fw={600}>
            <Text fw={500}>{feed.displayName}</Text>
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  );
}
