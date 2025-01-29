import { oauthClient } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const handle = request.nextUrl.searchParams.get("handle");

  if (!handle) {
    return new Response("Missing handle", { status: 400 });
  }

  const url = await oauthClient.authorize(handle.toString(), {
    ui_locales: "en",
    // TODO: add silent sign-in
    // prompt: 'none'
  });

  redirect(url.toString());
}
