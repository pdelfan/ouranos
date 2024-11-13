import {
  Agent,
  BskyFeedViewPreference,
  LabelPreference,
  BskyThreadViewPreference,
} from "@atproto/api";
import { getAgentFromServer } from "../agent";
import { ContentFilterLabel } from "../../../../../types/feed";

export const getProfile = async (handle: string | undefined, agent?: Agent) => {
  if (!handle) return;
  if (!agent) agent = await getAgentFromServer();
  const profile = await agent.getProfile({ actor: handle });

  if (!profile.success) throw new Error("Could not get profile");
  return profile.data;
};

export const getSuggestions = async () => {
  const agent = await getAgentFromServer();
  const suggestions = await agent.getSuggestions({ limit: 10 });
  if (!suggestions.success) return null;
  return suggestions.data.actors;
};

export const searchProfiles = async (
  agent: Agent,
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

export const searchProfilesTypehead = async (agent: Agent, term: string) => {
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
  agent?: Agent,
) => {
  if (!agent) agent = await getAgentFromServer();
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

export const getPreferences = async (agent?: Agent) => {
  if (!agent) agent = await getAgentFromServer();
  const prefs = await agent.app.bsky.actor.getPreferences();
  if (!prefs.success) throw new Error("Could not get preferences");
  return prefs.data.preferences;
};

export const updateThreadViewPreferences = async (
  pref: Partial<BskyThreadViewPreference>,
  agent?: Agent,
) => {
  if (!agent) agent = await getAgentFromServer();
  const prefs = await agent.setThreadViewPrefs(pref);
  return prefs;
};
export const updateHomeFeedPreferences = async (
  pref: Partial<BskyFeedViewPreference>,
  agent?: Agent,
) => {
  if (!agent) agent = await getAgentFromServer();
  const prefs = await agent.setFeedViewPrefs("home", pref);
  return prefs;
};

export const updateIsAdultContentEnabled = async (
  value: boolean,
  agent?: Agent,
) => {
  if (!agent) agent = await getAgentFromServer();
  const prefs = await agent.setAdultContentEnabled(value);
  return prefs;
};

export const updateContentFilterPreferences = async (
  pref: ContentFilterLabel,
  value: LabelPreference,
  agent?: Agent,
) => {
  if (!agent) agent = await getAgentFromServer();
  const prefs = await agent.setContentLabelPref(pref, value);
  return prefs;
};

export const muteUser = async (did: string, agent?: Agent) => {
  if (!agent) agent = await getAgentFromServer();
  const mute = await agent.mute(did);
  if (!mute.success) throw new Error("Could not mute user");
  return mute.success;
};

export const unMuteUser = async (did: string, agent?: Agent) => {
  if (!agent) agent = await getAgentFromServer();
  const mute = await agent.unmute(did);
  if (!mute.success) throw new Error("Could not unmute user");
  return mute.success;
};

export const blockUser = async (
  viewerDid: string,
  did: string,
  agent?: Agent,
) => {
  if (!agent) agent = await getAgentFromServer();
  const res = await agent.app.bsky.graph.block.create(
    { repo: viewerDid },
    { createdAt: new Date().toISOString(), subject: did },
  );

  return res;
};

export const unBlockUser = async (
  viewerDid: string,
  rkey: string,
  agent?: Agent,
) => {
  if (!agent) agent = await getAgentFromServer();
  await agent.app.bsky.graph.block.delete({ rkey: rkey, repo: viewerDid });
};
