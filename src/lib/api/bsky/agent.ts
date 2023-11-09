import { getSessionFromServer } from "@/app/api/auth/[...nextauth]/route";
import { BskyAgent } from "@atproto/api";
import { redirect } from "next/navigation";

export const at = new BskyAgent({
  // TODO: allow PDS URL — using bsky.social for now
  service: "https://bsky.social",
});

export const getBskySession = async () => {
  const session = await getSessionFromServer();
  if (!session?.user.bskySession) redirect("/");
  at.session = session.user.bskySession;
  return at;
};

export const getAgent = async () => {
  const bskyAgent = await getBskySession();
  return bskyAgent;
};
