import { Agent } from "@atproto/api";

export const getLists = async ({
  did,
  cursor,
  limit,
  agent,
}: {
  did: string;
  cursor?: string;
  limit?: number;
  agent: Agent;
}) => {
  const lists = await agent.app.bsky.graph.getLists({
    actor: did,
    cursor: cursor,
    limit: limit,
  });

  if (!lists.success) throw new Error(`Could not get ${did}'s lists`);

  return lists.data;
};
