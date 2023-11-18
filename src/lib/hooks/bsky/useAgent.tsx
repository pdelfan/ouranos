import { useEffect, useState } from "react";
import { at } from "../../api/bsky/agent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useAgent() {
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
  }, [router, session, status]);

  return agent;
}