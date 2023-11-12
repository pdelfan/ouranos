import { useEffect, useState } from "react";
import { at } from "../api/bsky/agent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useAgent() {
  const [agent, setAgent] = useState(at);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getAgent = async () => {
      if (!session?.user.bskySession) router.push("/");
      const bskySession = session?.user.bskySession;
      const result = await at.resumeSession(bskySession);
      try {
        const result = await at.resumeSession(bskySession);
        if (!result.success) router.push("/");
        setAgent(at);
      } catch (e) {
        router.push("/");
      }
    };
    getAgent();
  }, [router, session]);

  return agent;
}
