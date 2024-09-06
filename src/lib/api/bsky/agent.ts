import { AtpAgent } from "@atproto/api";
import { redirect } from "next/navigation";
import { getSessionFromServer } from "../auth/session";

export const createAgent = () => {
  const at = new AtpAgent({
    service: "https://bsky.social",
  });

  return at;
};

export const getBskySession = async () => {
  // TODO: allow PDS URL — using bsky.social for now
  const at = new AtpAgent({
    service: "https://bsky.social",
  });

  try {
    const session = await getSessionFromServer();
    if (!session?.user.bskySession) redirect("/");
    const result = await at.resumeSession(session.user.bskySession);
    if (!result.success) redirect("/");
  } catch (e) {
    redirect("/");
  }

  return at;
};

export const getAgent = async () => {
  const atpAgent = await getBskySession();
  return atpAgent;
};
