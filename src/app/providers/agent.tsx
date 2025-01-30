"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Agent } from "@atproto/api";

const AgentContext = createContext<Agent | null>(null);

interface Props {
  children: React.ReactNode;
  did: string;
}

export default function AgentProvider({ children, did }: Props) {
  if (!did) throw new Error("No DID passed to Agent Provider");
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    const getAgent = async () => {
      try {
        // TODO: cache
        const response = await fetch("/api/auth/session");
        if (!response.ok) {
          throw new Error("Failed to fetch session");
        }
        const session = await response.json();
        const agent = new Agent(session);
        setAgent(agent);
      } catch {
        throw new Error("Could not set agent");
      }
    };

    getAgent();
  }, []);

  return (
    <AgentContext.Provider value={agent}>{children}</AgentContext.Provider>
  );
}

export const useAgent = () => {
  const agent = useContext(AgentContext);
  if (!agent) {
    throw new Error("useAgent must be used within an AgentProvider");
  }
  return agent;
};
