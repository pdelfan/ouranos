import { Agent } from "@atproto/api";

export const getKnownFollowers = async ({
  handleOrDid,
  cursor,
  agent,
}: {
  handleOrDid: string;
  cursor?: string;
  agent: Agent;
}) => {
  const knownFollowers = await agent.app.bsky.graph.getKnownFollowers({
    actor: handleOrDid,
    cursor: cursor,
  });

  if (!knownFollowers.success) {
    throw new Error("Could not fetch known followers");
  }

  return knownFollowers.data;
};

export const getFollowers = async ({
  handleOrDid,
  cursor,
  limit,
  agent,
}: {
  handleOrDid: string;
  cursor?: string;
  limit?: number;
  agent: Agent;
}) => {
  const followers = await agent.getFollowers({
    actor: handleOrDid,
    cursor: cursor,
    limit: limit,
  });

  if (!followers.success) {
    throw new Error("Could not fetch followers");
  }

  return followers.data;
};

export const getFollows = async ({
  handleOrDid,
  cursor,
  limit,
  agent,
}: {
  handleOrDid: string;
  cursor?: string;
  limit?: number;
  agent: Agent;
}) => {
  const follows = await agent.getFollows({
    actor: handleOrDid,
    cursor: cursor,
    limit: limit,
  });

  if (!follows.success) {
    throw new Error("Could not fetch follows");
  }

  return follows.data;
};
