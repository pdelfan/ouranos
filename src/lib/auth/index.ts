import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { SessionStore, StateStore } from "./storage";
import { db } from "./db";

const isDevelopment = process.env.NODE_ENV === "development";
const SCOPE = "atproto transition:generic";
const ORIGIN = isDevelopment
  ? "http://127.0.0.1:3000"
  : "https://useouranos.app";

const REDIRECT_PATH = "api/auth/callback";

const LOCAL_SEARCH_PARAMS = new URLSearchParams({
  scope: SCOPE,
  redirect_uri: new URL(REDIRECT_PATH, ORIGIN).toString(),
});

const client_id = isDevelopment
  ? `http://localhost?${LOCAL_SEARCH_PARAMS.toString()}`
  : new URL("/client-metadata.json", ORIGIN).toString();

const CLIENT_METADATA = {
  client_id,
  client_name: "Ouranos",
  logo_uri: `${ORIGIN}/logoFull.svg`,
  client_uri: ORIGIN,
  redirect_uris: [new URL(REDIRECT_PATH, ORIGIN).toString()],
  grant_types: ["authorization_code", "refresh_token"],
  response_types: ["code"],
  application_type: "web",
  scope: SCOPE,
  // token_endpoint_auth_method: "private_key_jwt",
  token_endpoint_auth_method: "none",
  // token_endpoint_auth_signing_alg: "ES256",
  dpop_bound_access_tokens: true,
  // jwks_uri: "auth/jwks.json",
};

const createOAuthClient = async () => {
  const client = new NodeOAuthClient({
    clientMetadata: CLIENT_METADATA,
    stateStore: new StateStore(db),
    sessionStore: new SessionStore(db),
  });

  return client;
};

export const oauthClient = await createOAuthClient();
