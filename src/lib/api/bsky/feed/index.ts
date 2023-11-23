import { type BskyAgent, AppBskyActorDefs } from "@atproto/api";
import { getAgent } from "../agent";
import { SavedFeed } from "../../../../../types/feed";

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

export const getSavedFeeds = async (
  agent?: BskyAgent
): Promise<SavedFeed[]> => {
  if (!agent) agent = await getAgent();
  const prefs = await agent.app.bsky.actor.getPreferences();
  if (!prefs.success) throw new Error("Could not fetch feeds");

  const feedsPref = prefs.data.preferences.find(
    (pref) =>
      AppBskyActorDefs.isSavedFeedsPref(pref) &&
      AppBskyActorDefs.validateSavedFeedsPref(pref).success
  ) as AppBskyActorDefs.SavedFeedsPref | undefined;

  if (!feedsPref || feedsPref.saved.length === 0) return [];

  const generators = await agent.app.bsky.feed.getFeedGenerators({
    feeds: feedsPref.saved,
  });
  if (!generators.success) {
    throw new Error("Could not fetch feed generators");
  }

  return generators.data.feeds.map((feed) => ({
    ...feed,
    pinned: feedsPref.pinned.includes(feed.uri),
  }));
};

export const togglePinFeed = async (agent: BskyAgent, feed: string) => {
  const prefs = await agent.app.bsky.actor.getPreferences();
  if (!prefs.success) throw new Error("Could not fetch feeds");

  for (const pref of prefs.data.preferences) {
    if (
      AppBskyActorDefs.isSavedFeedsPref(pref) &&
      AppBskyActorDefs.validateSavedFeedsPref(pref).success
    ) {
      if (pref.pinned.includes(feed)) {
        pref.pinned = pref.pinned.filter((f) => f !== feed);
      } else {
        pref.pinned.push(feed);
      }
    }
  }

  return await agent.app.bsky.actor.putPreferences({
    preferences: prefs.data.preferences,
  });
};

export const toggleSaveFeed = async (agent: BskyAgent, feed: string) => {
  const prefs = await agent.app.bsky.actor.getPreferences();
  if (!prefs.success) throw new Error("Could not fetch feeds");

  for (const pref of prefs.data.preferences) {
    if (
      AppBskyActorDefs.isSavedFeedsPref(pref) &&
      AppBskyActorDefs.validateSavedFeedsPref(pref).success
    ) {
      if (pref.saved.includes(feed)) {
        pref.pinned = pref.pinned.filter((f) => f !== feed);
        pref.saved = pref.saved.filter((f) => f !== feed);
      } else {
        pref.saved.push(feed);
      }
    }
  }

  return await agent.app.bsky.actor.putPreferences({
    preferences: prefs.data.preferences,
  });
};

export const getTimeline = async (agent: BskyAgent, cursor?: string) => {
  const timeline = await agent.getTimeline({ cursor: cursor });
  return timeline;
};

export const getFeed = async (
  agent: BskyAgent,
  uri: string,
  cursor: string
) => {
  const feed = await agent.app.bsky.feed.getFeed({ feed: uri, cursor: cursor });
  return feed;
};

export const getFeedInfo = async (agent: BskyAgent, uri: string) => {
  const feed = await agent.app.bsky.feed.getFeedGenerator({ feed: uri });
  if (!feed.success) throw new Error("Could not fetch feed info");
  return feed.data;
};

export const getUserPosts = async (
  agent: BskyAgent,
  handle: string,
  cursor: string
) => {
  const posts = await agent.getAuthorFeed({ actor: handle, cursor: cursor });

  if (!posts.success) throw new Error("Could not fetch posts");
  return posts;
};

export const getUserReplyPosts = async (
  agent: BskyAgent,
  handle: string,
  cursor: string
) => {
  const posts = await agent.getAuthorFeed({
    actor: handle,
    filter: "posts_with_replies",
    cursor: cursor,
  });

  if (!posts.success) throw new Error("Could not fetch replies");
  return posts;
};

export const getUserMediaPosts = async (
  agent: BskyAgent,
  handle: string,
  cursor: string
) => {
  const posts = await agent.getAuthorFeed({
    actor: handle,
    filter: "posts_with_media",
    cursor: cursor,
  });

  if (!posts.success) throw new Error("Could not fetch media posts");
  return posts;
};

export const getUserLikes = async (
  agent: BskyAgent,
  handle: string,
  cursor: string
) => {
  if (!agent) agent = await getAgent();
  const likes = await agent.api.app.bsky.feed.getActorLikes({
    actor: handle,
    cursor: cursor,
  });

  if (!likes.success) throw new Error("Could not fetch likes");
  return likes;
};

export const likePost = async (agent: BskyAgent, uri: string, cid: string) => {
  try {
    const like = await agent.like(uri, cid);
    return like;
  } catch (e) {
    throw new Error("Could not like post");
  }
};

export const unlikePost = async (agent: BskyAgent, likeUri: string) => {
  try {
    const unlike = await agent.deleteLike(likeUri);
    return unlike;
  } catch (e) {
    throw new Error("Could not unlike post");
  }
};

export const getPost = async (agent: BskyAgent, uri: string) => {
  try {
    const post = await agent.getPostThread({ uri: uri, depth: 1 });
    if (!post.success) throw new Error("Could not fetch post");
    return post;
  } catch (e) {
    throw new Error("Could not fetch post");
  }
};

export const getPostThread = async (agent: BskyAgent, uri: string) => {
  try {
    const posts = await agent.getPostThread({ uri: uri });
    return posts;
  } catch (e) {
    throw new Error("Could not fetch post thread");
  }
};
