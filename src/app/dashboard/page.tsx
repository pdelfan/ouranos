"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user.bskySession) {
      router.push("/dashboard/home");
    }
  }, [router, status, session?.user.bskySession]);

  return <></>;
}
