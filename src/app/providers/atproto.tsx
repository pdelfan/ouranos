"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  OAuthSession,
  BrowserOAuthClient,
} from "@atproto/oauth-client-browser";
import { Agent } from "@atproto/api";
import { createOAuthClient } from "@/lib/auth";

type ATProtoContextValue = {
  oauthClient?: BrowserOAuthClient;
  session?: OAuthSession;
  agent?: Agent;
  loading: boolean;
};

const ATProtoContext = createContext<ATProtoContextValue | null>(null);

export function ATProtoProvider({ children }: { children: ReactNode }) {
  const [oauthClient, setOAuthClient] = useState<BrowserOAuthClient>();
  const [session, setSession] = useState<OAuthSession>();
  const [agent, setAgent] = useState<Agent>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = createOAuthClient();

    client.init().then((result) => {
      if (result && "session" in result) {
        const atProtoAgent = new Agent(result.session);
        setOAuthClient(client);
        setSession(result.session);
        setAgent(atProtoAgent);
        setLoading(false);
      } else {
        const atProtoAgent = new Agent("https://bsky.social");
        setOAuthClient(client);
        setAgent(atProtoAgent);
        setLoading(false);
      }
    });
  }, []);

  return (
    <ATProtoContext.Provider
      value={{
        oauthClient,
        session,
        agent,
        loading,
      }}
    >
      {loading ? null : children}
    </ATProtoContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(ATProtoContext);
  if (ctx?.session == null) throw new Error("Missing session");

  return ctx?.session;
}

export function useAgent() {
  const ctx = useContext(ATProtoContext);
  if (ctx?.agent == null) throw new Error("Missing agent");

  return ctx.agent;
}

export function useOAuthClient() {
  const ctx = useContext(ATProtoContext);
  if (ctx?.oauthClient == null) throw new Error("Missing oauthClient");

  return ctx.oauthClient;
}
