import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createAgent } from "@/lib/api/bsky/agent";

export default function useAgent() {
  const at = createAgent();
  const [agent, setAgent] = useState(at);
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
      at.session = bskySession;
      setAgent(at);
    };

    getAgent();
  }, [at, router, session?.user.bskySession, status]);

  return agent;
}
