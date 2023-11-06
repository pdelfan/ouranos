import { getAgent } from "../agent";

export const getPopularFeeds = async (search?: string) => {
  const agent = await getAgent();
  const popularFeeds = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    query: search,
  });

  if (!popularFeeds.success) {
    throw new Error("Couldn't get popular feeds");
  }

  return popularFeeds.data.feeds;
};
