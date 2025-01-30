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
