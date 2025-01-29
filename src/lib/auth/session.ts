import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { oauthClient } from "@/lib/auth/index";
import { Agent } from "@atproto/api";
import type { CookieSession } from "@/types/auth";

export const getSession = async () => {
  if (!process.env.COOKIE_SECRET) throw new Error("COOKIE_SECRET is not set");

  const cookieSession: CookieSession = await getIronSession(await cookies(), {
    password: process.env.COOKIE_SECRET,
    cookieName: "at_cookie",
  });

  return cookieSession;
};

export const getBskyAgent = async () => {
  const cookieSession = await getSession();
  const did = cookieSession.did;
  const session = await oauthClient.restore(did);

  if (!session) redirect("/");

  return new Agent(session);
};
