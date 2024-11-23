import AtpAgent from "@atproto/api";
import { getAgentFromServer } from "../bsky/agent";

export const getATRecords = async (
  did: string,
  collection: string,
  agent: AtpAgent
) => {
  if (!agent) agent = await getAgentFromServer();

  const result = await agent.com.atproto.repo.listRecords({
    repo: did,
    collection: collection,
    limit: 10,
  });

  if (!result.success) {
    throw new Error(`Could not get records from collection '${collection}'`);
  }

  return result.data;
};
