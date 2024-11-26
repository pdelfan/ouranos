"use client";

import { ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { createAgent } from "@/lib/api/bsky/agent";
import AtpAgent from "@atproto/api";
import type { Session } from "next-auth";
import { isSessionExpired } from "@/lib/utils/session";
import { useSession } from "next-auth/react";

const AgentContext = createContext<AtpAgent | null>(null);

interface AgentProviderProps {
  children: ReactNode;
  session: Session | null;
}

export const AgentProvider = (props: AgentProviderProps) => {
  const { children, session } = props;

  if (!session) return;
  const agent = createAgent(session.user.service);
  agent.sessionManager.session = session.user.bskySession;

  return (
    <AgentContext.Provider value={agent}>{children}</AgentContext.Provider>
  );
};

export const useAgent = () => {
  const { data: session, status } = useSession();
  const agent = useContext(AgentContext);

  useEffect(() => {
    if (!session || !agent) return;

    const getSession = async () => {
      if (isSessionExpired(session.user.bskySession)) {
        const result = await agent.resumeSession(session.user.bskySession);

        if (!result.success) {
          throw new Error("Could not resume session");
        }
      }

      agent.sessionManager.session = session.user.bskySession;
    };

    getSession();
  }, [agent, session]);

  if (status !== "authenticated" || !agent || !session?.user) {
    throw new Error("AgentProvider must be used inside SessionProvider");
  }

  return agent;
};
