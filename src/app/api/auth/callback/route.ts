import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { oauthClient } from "@/lib/auth";
import type { CookieSession } from "@/types/auth";

export async function GET({ nextUrl }: NextRequest) {
  if (!process.env.COOKIE_SECRET) throw new Error("COOKIE_SECRET is not set");

  try {
    const { session } = await oauthClient.callback(nextUrl.searchParams);
    const cookieSession: CookieSession = await getIronSession(await cookies(), {
      password: process.env.COOKIE_SECRET,
      cookieName: "at_cookie",
    });

    cookieSession.did = session.did;
    await cookieSession.save();
  } catch (e) {
    throw new Error("Could not process callback");
  }

  redirect("/dashboard");
}
