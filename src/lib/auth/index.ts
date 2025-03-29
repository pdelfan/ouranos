import { BrowserOAuthClient,  } from "@atproto/oauth-client-browser";

const isDevelopment = process.env.NODE_ENV === "development";

if (!process.env.NEXT_PUBLIC_SITE_URL || !process.env.NEXT_PUBLIC_PORT) {
  throw new Error("SITE URL or PORT env variables not set");
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const PORT = process.env.NEXT_PUBLIC_PORT;
const SCOPE = "atproto transition:generic transition:chat.bsky";
const REDIRECT_PATH = "/dashboard";
const BASE_URL = isDevelopment
  ? new URL(`${SITE_URL}:${PORT}`)
  : new URL(SITE_URL);
const LOCAL_SEARCH_PARAMS = new URLSearchParams({
  scope: SCOPE,
  redirect_uri: new URL(REDIRECT_PATH, BASE_URL).toString(),
});
const CLIENT_ID = isDevelopment ? `http://localhost?${LOCAL_SEARCH_PARAMS.toString()}` : new URL("/client-metadata.json", BASE_URL).toString();


export const createOAuthClient = () => {
  const client = new BrowserOAuthClient({
    clientMetadata: {
      client_id: CLIENT_ID,
      client_name: "Ouranos",
      client_uri: BASE_URL.toString(),
      logo_uri: `${BASE_URL}/logoFull.svg`,
      redirect_uris: [new URL(REDIRECT_PATH, BASE_URL).toString()],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "web",
      scope: SCOPE,
      token_endpoint_auth_method: "none",
      dpop_bound_access_tokens: true,
    },
    responseMode: "query",
    handleResolver: "https://bsky.social"
  });

  return client;
};
