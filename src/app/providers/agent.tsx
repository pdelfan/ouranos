"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Agent } from "@atproto/api";

const AgentContext = createContext<Agent | null>(null);

interface Props {
  children: React.ReactNode;
  did: string;
}

export default function AgentProvider({ children, did }: Props) {
  if (!did) throw new Error("No DID passed to Agent Provider");

  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAgent = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (!response.ok) {
          throw new Error("Failed to fetch session");
        }
        const session = await response.json();

        if (session) {
          const agent = new Agent(session);
          setAgent(agent);
        } else {
          throw new Error("Session data is invalid");
        }
      } catch (error) {
        console.error("Error creating agent:", error);
        setAgent(null);
      } finally {
        setLoading(false);
      }
    };

    getAgent();
  }, [did]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
