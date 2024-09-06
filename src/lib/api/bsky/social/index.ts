import { AtUri, AtpAgent } from "@atproto/api";

export const getFollowers = async (
  handle: string,
  agent: AtpAgent,
  cursor: string,
) => {
  const followers = await agent.getFollowers({ actor: handle, cursor: cursor });

  if (!followers.success) throw new Error("Could not fetch followers");
  return followers;
};

export const getFollows = async ({
  handle,
  agent,
  cursor,
  limit,
}: {
  handle: string;
  agent: AtpAgent;
  cursor?: string;
  limit?: number;
}) => {
  const follows = await agent.getFollows({
    actor: handle,
    cursor: cursor,
    limit: limit,
  });

  if (!follows.success) throw new Error("Could not fetch follows");
  return follows;
};

export const follow = async (agent: AtpAgent, did: string) => {
  const follow = await agent.follow(did);

  if (!follow.uri) throw new Error("Could not follow");
  return;
};

export const unfollow = async (agent: AtpAgent, did: string) => {
  const unfollow = await agent.deleteFollow(did);
  return unfollow;
};

export const unBlock = async (
  agent: AtpAgent,
  did: string,
  viewer: string,
) => {
  const { rkey } = new AtUri(viewer);
  const res = await agent.app.bsky.graph.block.delete({
    repo: did,
    rkey,
  });
  return res;
};

export const getMutedUsers = async (agent: AtpAgent, cursor: string) => {
  const mutedUsers = await agent.api.app.bsky.graph.getMutes({
    cursor: cursor,
  });
  if (!mutedUsers.success) {
    throw new Error("Could not fetch muted users");
  }
  return mutedUsers.data;
};

export const getBlockedUsers = async (agent: AtpAgent, cursor: string) => {
  const blockedUsers = await agent.api.app.bsky.graph.getBlocks({
    cursor: cursor,
  });
  if (!blockedUsers.success) {
    throw new Error("Could not fetch muted users");
  }
  return blockedUsers.data;
};

export const getKnownFollowers = async (
  agent: AtpAgent,
  did: string,
  cursor?: string,
) => {
  const knownFollowers = await agent.app.bsky.graph.getKnownFollowers({
    actor: did,
    cursor: cursor,
  });

  if (!knownFollowers.success) {
    throw new Error("Could not fetch known followers");
  }

  return knownFollowers.data;
};
