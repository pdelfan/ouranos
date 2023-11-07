import { getAgent } from "../agent";

export const getProfile = async (handle: string | undefined) => {
  if (!handle) return;
  const agent = await getAgent();
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
