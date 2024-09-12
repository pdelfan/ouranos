import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createAgent } from "@/lib/api/bsky/agent";

export default function useAgent() {
  const [agent, setAgent] = useState(createAgent());
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user.bskySession) {
      router.push("/");
      return;
    }

    const getAgent = async () => {
      const bskySession = session.user.bskySession;
      agent.sessionManager.session = bskySession;
    };

    getAgent();
  }, [agent, router, session?.user.bskySession, status]);

  return agent;
}
