import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { oauthClient } from "@/lib/auth";
import type { CookieSession } from "@/types/auth";

export async function GET() {
  if (!process.env.COOKIE_SECRET) throw new Error("COOKIE_SECRET is not set");

  try {
    const cookieSession: CookieSession = await getIronSession(await cookies(), {
      password: process.env.COOKIE_SECRET,
      cookieName: "at_cookie",
    });

    const did = cookieSession.did;
    const session = await oauthClient.restore(did);

    return Response.json({ session });
  } catch {
    redirect("/");
  }
}
