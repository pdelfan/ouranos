import { Agent, AppBskyActorDefs } from "@atproto/api";

export const getSavedFeeds = async ({ agent }: { agent: Agent }) => {
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
  if (!generators.success) throw new Error("Could not get feed generators");

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
  agent: Agent;
}) => {
  const popularFeeds = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: limit,
  });

  if (!popularFeeds.success) throw new Error("Could not get popular feeds");

  return popularFeeds.data;
};

export const getUserPosts = async ({
  handleOrDid,
  cursor,
  limit,
  agent,
}: {
  handleOrDid: string;
  cursor?: string;
  limit?: number;
  agent: Agent;
}) => {
  const posts = await agent.getAuthorFeed({
    actor: handleOrDid,
    cursor: cursor,
    filter: "posts_no_replies",
    includePins: true,
    limit: limit,
  });

  if (!posts.success) throw new Error("Could not fetch posts");

  return posts.data;
};

export const getUserReplyPosts = async ({
  handleOrDid,
  cursor,
  limit,
  agent,
}: {
  handleOrDid: string;
  cursor?: string;
  limit?: number;
  agent: Agent;
}) => {
  const posts = await agent.getAuthorFeed({
    actor: handleOrDid,
    filter: "posts_with_replies",
    cursor: cursor,
    limit: limit,
  });

  if (!posts.success) throw new Error("Could not fetch replies");

  return posts.data;
};

export const getUserMediaPosts = async ({
  handleOrDid,
  cursor,
  limit,
  agent,
}: {
  handleOrDid: string;
  cursor?: string;
  limit?: number;
  agent: Agent;
}) => {
  const posts = await agent.getAuthorFeed({
    actor: handleOrDid,
    filter: "posts_with_media",
    cursor: cursor,
    limit: limit,
  });

  if (!posts.success) throw new Error("Could not fetch media posts");

  return posts.data;
};

export const getUserLikes = async ({
  handleOrDid,
  cursor,
  limit,
  agent,
}: {
  handleOrDid: string;
  cursor?: string;
  limit?: number;
  agent: Agent;
}) => {
  const likes = await agent.app.bsky.feed.getActorLikes({
    actor: handleOrDid,
    cursor: cursor,
    limit: limit,
  });

  if (!likes.success) throw new Error("Could not fetch likes");

  return likes.data;
};
