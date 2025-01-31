import { getBskyAgent } from "@/lib/auth/session";
import { Agent } from "@atproto/api";

export const getSuggestedStarterPacks = async ({
  agent,
}: {
  agent?: Agent;
}) => {
  if (!agent) agent = await getBskyAgent();

  const starterPacks = await agent.app.bsky.graph.getStarterPacks({
    uris: [
      "at://did:plc:f4mo3gf7alxz32fvlt6wgtfb/app.bsky.graph.starterpack/3lbkrfks7lz2k",
      "at://did:plc:denuvqodvvnzxtuitumle4vs/app.bsky.graph.starterpack/3l73krxhwvq2y",
      "at://did:plc:3bybp6nqszlhuan2ch2cmv66/app.bsky.graph.starterpack/3kvvr4e54j22e",
    ],
  });

  if (!starterPacks.success) {
    throw new Error("Could not get suggested starter packs");
  }

  return starterPacks.data;
};
