import { getSession } from "@/lib/auth/session";
import Shell from "@/components/navigation/shell/Shell";
import TanStackQueryProvider from "@/app/providers/tanstack";
import AgentProvider from "@/app/providers/agent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s — Ouranos", default: "Ouranos" },
  description: "Home",
};

interface Props {
  children: React.ReactNode;
}

export default async function Layout(props: Props) {
  const session = await getSession();

  return (
    <TanStackQueryProvider>
      <AgentProvider did={session.did}>
        <Shell>{props.children}</Shell>
      </AgentProvider>
    </TanStackQueryProvider>
  );
}
