import { getSessionFromServer } from "@/app/api/auth/[...nextauth]/route";
import { BskyAgent } from "@atproto/api";

export const at = new BskyAgent({
  // TODO: allow PDS URL — using bsky.social for now
  service: "https://bsky.social",
});

// TODO: move to route handlers
export const getBskySession = async () => {
  const session = await getSessionFromServer();
  if (session?.user.bskySession) {
    at.session = session.user.bskySession;
  }
  return at;
};

export const getAgent = async () => {
  const bskyAgent = await getBskySession();
  return bskyAgent;
};

export const getProfile = async (handle: string | undefined) => {
  if (!handle) return;
  const agent = await getAgent();
  const profile = await agent.getProfile({ actor: handle });

  if (!profile.data) return null;
  return profile.data;
};
