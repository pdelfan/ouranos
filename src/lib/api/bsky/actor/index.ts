import {
  BskyAgent,
  BskyFeedViewPreference,
  LabelPreference,
  BskyThreadViewPreference,
} from "@atproto/api";
import { getAgent } from "../agent";
import { ContentFilterLabel } from "../../../../../types/feed";

export const getProfile = async (
  handle: string | undefined,
  agent?: BskyAgent,
) => {
  if (!handle) return;
  if (!agent) agent = await getAgent();
  const profile = await agent.getProfile({ actor: handle });

  if (!profile.success) throw new Error("Could not get profile");
  return profile.data;
};

export const getSuggestions = async () => {
  const agent = await getAgent();
  const suggestions = await agent.getSuggestions({ limit: 30 });
  if (!suggestions.success) return null;
  return suggestions.data.actors;
};

export const searchProfiles = async (
  agent: BskyAgent,
  term: string,
  cursor: string,
) => {
  try {
    const results = await agent.searchActors({ term, cursor });
    if (!results.success) return null;
    return results.data;
  } catch (e) {
    console.error(e);
    throw new Error("Could not search for users");
  }
};

export const searchProfilesTypehead = async (
  agent: BskyAgent,
  term: string,
) => {
  try {
    const results = await agent.searchActorsTypeahead({ term, limit: 5 });
    if (!results.success) return null;
    return results.data;
  } catch (e) {
    console.error(e);
    throw new Error("Could not search for users typehead");
  }
};

export const searchPosts = async (
  term: string,
  cursor: string,
  sort: "latest" | "top",
  agent?: BskyAgent,
) => {
  if (!agent) agent = await getAgent();
  try {
    const response = await agent.app.bsky.feed.searchPosts({
      q: term,
      cursor: cursor,
      sort: sort,
      limit: 25,
    });
    if (response.success) {
      return response.data;
    }
  } catch (e) {
    console.error(e);
    throw new Error("Could not search for posts");
  }
};

export const getPreferences = async (agent?: BskyAgent) => {
  if (!agent) agent = await getAgent();
  const prefs = await agent.app.bsky.actor.getPreferences();
  if (!prefs.success) throw new Error("Could not get preferences");
  return prefs.data.preferences;
};

export const updateThreadViewPreferences = async (
  pref: Partial<BskyThreadViewPreference>,
  agent?: BskyAgent,
) => {
  if (!agent) agent = await getAgent();
  const prefs = await agent.setThreadViewPrefs(pref);
  return prefs;
};
export const updateHomeFeedPreferences = async (
  pref: Partial<BskyFeedViewPreference>,
  agent?: BskyAgent,
) => {
  if (!agent) agent = await getAgent();
  const prefs = await agent.setFeedViewPrefs("home", pref);
  return prefs;
};

export const updateIsAdultContentEnabled = async (
  value: boolean,
  agent?: BskyAgent,
) => {
  if (!agent) agent = await getAgent();
  const prefs = await agent.setAdultContentEnabled(value);
  return prefs;
};

export const updateContentFilterPreferences = async (
  pref: ContentFilterLabel,
  value: LabelPreference,
  agent?: BskyAgent,
) => {
  if (!agent) agent = await getAgent();
  const prefs = await agent.setContentLabelPref(pref, value);
  return prefs;
};

export const muteUser = async (did: string, agent?: BskyAgent) => {
  if (!agent) agent = await getAgent();
  const mute = await agent.mute(did);
  if (!mute.success) throw new Error("Could not mute user");
  return mute.success;
};

export const unMuteUser = async (did: string, agent?: BskyAgent) => {
  if (!agent) agent = await getAgent();
  const mute = await agent.unmute(did);
  if (!mute.success) throw new Error("Could not unmute user");
  return mute.success;
};

export const blockUser = async (
  viewerDid: string,
  did: string,
  agent?: BskyAgent,
) => {
  if (!agent) agent = await getAgent();
  const res = await agent.app.bsky.graph.block.create(
    { repo: viewerDid },
    { createdAt: new Date().toISOString(), subject: did },
  );

  return res;
};

export const unBlockUser = async (
  viewerDid: string,
  rkey: string,
  agent?: BskyAgent,
) => {
  if (!agent) agent = await getAgent();
  await agent.app.bsky.graph.block.delete({ rkey: rkey, repo: viewerDid });
};
