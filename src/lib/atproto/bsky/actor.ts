import { getBskyAgent } from "@/lib/auth/session";
import { Agent } from "@atproto/api";

export const getProfile = async ({
  handleOrDid,
  agent,
}: {
  handleOrDid: string | undefined;
  agent?: Agent;
}) => {
  if (!handleOrDid) throw new Error("handle not given");
  if (!agent) agent = await getBskyAgent();

  const profile = await agent.getProfile({ actor: handleOrDid });

  if (!profile.success) throw new Error("Could not get profile");
  return profile.data;
};

export const getUserSuggestions = async ({ agent }: { agent?: Agent }) => {
  if (!agent) agent = await getBskyAgent();

  const suggestions = await agent.getSuggestions({ limit: 10 });

  if (!suggestions.success) throw new Error("Could not get suggestions");
  return suggestions.data;
};
