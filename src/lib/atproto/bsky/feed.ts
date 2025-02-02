import { getBskyAgent } from "@/lib/auth/session";
import { Agent, AppBskyActorDefs } from "@atproto/api";

export const getSavedFeeds = async ({ agent }: { agent?: Agent }) => {
  if (!agent) agent = await getBskyAgent();

  const preferences = await agent.app.bsky.actor.getPreferences();
  if (!preferences.success)
    throw new Error("Could not get preferences for saved feeds");

  const feeds = preferences.data.preferences.find(
    (pref) =>
      AppBskyActorDefs.isSavedFeedsPref(pref) &&
      AppBskyActorDefs.validateSavedFeedsPref(pref).success
  ) as AppBskyActorDefs.SavedFeedsPref | undefined;

  if (!feeds || feeds.saved.length === 0) return [];

  const generators = await agent.app.bsky.feed.getFeedGenerators({
    feeds: feeds.saved,
  });
  if (!generators.success) {
    throw new Error("Could not get feed generators");
  }

  const savedFeeds = generators.data.feeds.map((feed) => ({
    ...feed,    
    pinned: feeds.pinned.includes(feed.uri),
  }));

  return savedFeeds;
};

export const getPopularFeeds = async ({
  limit = 30,
  agent,
}: {
  limit?: number;
  agent?: Agent;
}) => {
  if (!agent) agent = await getBskyAgent();

  const popularFeeds = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: limit,
  });

  if (!popularFeeds.success) {
    throw new Error("Could not get popular feeds");
  }

  return popularFeeds.data;
};
