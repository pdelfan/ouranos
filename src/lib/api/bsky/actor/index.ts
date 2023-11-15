import { BskyAgent } from "@atproto/api";
import { getAgent } from "../agent";

export const getProfile = async (
  handle: string | undefined,
  agent?: BskyAgent
) => {
  if (!handle) return;
  if (!agent) agent = await getAgent();
  const profile = await agent.getProfile({ actor: handle });

  if (!profile.data) return null;
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
  cursor: string
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
