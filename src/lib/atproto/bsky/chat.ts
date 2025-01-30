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

  const convos = await agent.chat.bsky.convo.listConvos(
    {
      cursor: cursor,
      limit: 30,
    },
    { headers: { "atproto-proxy": "did:web:api.bsky.chat#bsky_chat" } },
  );

  if (!convos.success) throw new Error("Could not get chat convos");

  return convos.data;
};
