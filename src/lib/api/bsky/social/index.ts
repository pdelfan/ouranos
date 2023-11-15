import { BskyAgent } from "@atproto/api";
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

export const follow = async (agent: BskyAgent, did: string) => {
  const follow = await agent.follow(did);

  if (!follow.uri) throw new Error("Could not follow");
  return;
};

export const unfollow = async (agent: BskyAgent, did: string) => {
  const unfollow = await agent.deleteFollow(did);
  return unfollow;
};