import { getBskyAgent } from "@/lib/auth/session";
import { Agent } from "@atproto/api";

export const getChatConvos = async ({
  agent,
  cursor,
}: {
  agent?: Agent;
  cursor?: string;
}) => {
  if (!agent) agent = await getBskyAgent();

  const proxy = agent.withProxy(
    "atproto-proxy",
    "did:web:api.bsky.chat#bsky_chat"
  );

  const convos = await proxy.chat.bsky.convo.listConvos({
    cursor: cursor,
    limit: 30,
  });

  if (!convos.success) throw new Error("Could not get chat convos");

  return convos.data;
};
