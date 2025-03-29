import { Agent } from "@atproto/api";

export const getChatConvos = async ({
  agent,
  cursor,
}: {
  agent: Agent;
  cursor?: string;
}) => {
  const convos = await agent.chat.bsky.convo.listConvos(
    {
      cursor: cursor,
      limit: 30,
    },
    {
      headers: {
        "Atproto-Proxy": "did:web:api.bsky.chat#bsky_chat",
      },
    },
  );

  if (!convos.success) throw new Error("Could not get chat convos");

  return convos.data;
};
