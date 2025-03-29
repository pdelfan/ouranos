import { Agent } from "@atproto/api";

export const getProfile = async ({
  handleOrDid,
  agent,
}: {
  handleOrDid: string;
  agent: Agent;
}) => {
  const profile = await agent.getProfile({ actor: handleOrDid });

  if (!profile.success) throw new Error("Could not get profile");
  return profile.data;
};

export const getUserSuggestions = async ({ agent }: { agent: Agent }) => {
  const suggestions = await agent.getSuggestions({ limit: 10 });

  if (!suggestions.success) throw new Error("Could not get suggestions");
  return suggestions.data;
};
