import { oauthClient } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import type { CookieSession } from "@/types/auth";

export async function GET() {
  if (!process.env.COOKIE_SECRET) throw new Error("COOKIE_SECRET is not set");

  const cookieSession: CookieSession = await getIronSession(await cookies(), {
    password: process.env.COOKIE_SECRET,
    cookieName: "at_cookie",
  });

  const did = cookieSession.did;
  cookieSession.destroy();
  const session = await oauthClient.restore(did);
  await session.signOut();

  redirect("/");
}
