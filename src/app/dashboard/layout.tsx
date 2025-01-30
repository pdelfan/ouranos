import { getSession } from "@/lib/auth/session";
import AppShell from "@/components/navigation/appShell/AppShell";
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
        <AppShell>{props.children}</AppShell>
      </AgentProvider>
    </TanStackQueryProvider>
  );
}
