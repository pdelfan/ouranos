import { oauthClient } from "@/lib/auth";

export async function GET() {
  return Response.json(oauthClient.clientMetadata);
}
