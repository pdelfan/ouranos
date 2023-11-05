import { getSessionFromServer } from "@/app/api/auth/[...nextauth]/route";
import { BskyAgent } from "@atproto/api";

export const at = new BskyAgent({
  // TODO: allow PDS URL — using bsky.social for now
  service: "https://bsky.social",
});

export const getBskySession = async () => {
  const session = await getSessionFromServer();
  return session?.user.bskySession;
};

export const getProfile = async (handle: string) => {
  const session = await getBskySession();
  await at.resumeSession(session);
  const profile = await at.getProfile({ actor: handle });

  if (!profile.data) return null;
  return profile.data;
};
