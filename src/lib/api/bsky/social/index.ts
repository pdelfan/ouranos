import { getAgent } from "../agent";

export const getFollowers = async (handle: string) => {
  const agent = await getAgent();
  const followers = await agent.getFollowers({ actor: handle });

  if (!followers.success) throw new Error("Could not fetch followers");
  return followers;
};

export const getFollows = async (handle: string) => {
  const agent = await getAgent();
  const follows = await agent.getFollows({ actor: handle });

  if (!follows.success) throw new Error("Could not fetch follows");
  return follows;
};
