import { type BskyAgent } from "@atproto/api";

export const getLists = async (
  did: string,
  cursor: string,
  agent: BskyAgent,
) => {
  const lists = await agent.app.bsky.graph.getLists({
    actor: did,
    cursor: cursor,
  });

  if (!lists.success) throw new Error("Could not fetch list");
  return lists.data;
};

export const getListInfo = async (agent: BskyAgent, uri: string) => {
  const feed = await agent.app.bsky.graph.getList({ list: uri });
  if (!feed.success) throw new Error("Could not fetch feed info");
  return feed.data;
};

export const getListFeed = async (
  agent: BskyAgent,
  uri: string,
  cursor: string,
) => {
  const feed = await agent.app.bsky.feed.getListFeed({
    list: uri,
    cursor: cursor,
  });
  return feed;
};

export const getListMembers = async (
  agent: BskyAgent,
  uri: string,
  cursor: string,
) => {
  const list = await agent.app.bsky.graph.getList({
    list: uri,
    cursor: cursor,
  });
  if (!list.success) throw new Error("Could not fetch list");
  return list.data;
};
