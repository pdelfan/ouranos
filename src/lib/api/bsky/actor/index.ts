import { getAgent } from "../agent";

export const getProfile = async (handle: string | undefined) => {
  if (!handle) return;
  const agent = await getAgent();
  const profile = await agent.getProfile({ actor: handle });

  if (!profile.data) return null;
  return profile.data;
};
