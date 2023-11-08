import { useEffect, useState } from "react";
import { at } from "../api/bsky/agent";
import { useSession } from "next-auth/react";

export default function useAgent() {
  const [agent, setAgent] = useState(at);
  const { data: session } = useSession();

  useEffect(() => {
    const getAgent = async () => {
      if (!session) return;
      at.session = session?.user.bskySession;
      setAgent(at);
    };
    getAgent();
  }, [session?.user.bskySession]);

  return agent;
}
