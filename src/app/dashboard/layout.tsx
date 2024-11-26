import type { Metadata } from "next";
import SidePanel from "@/components/navigational/sidePanel/SidePanel";
import Aside from "@/components/navigational/aside/Aside";
import AppBar from "@/components/navigational/appBar/AppBar";
import TopBar from "@/components/navigational/topBar/TopBar";
import Composer from "@/components/actions/composer/Composer";
import { getProfile } from "@/lib/api/bsky/actor";
import { getSessionFromServer } from "@/lib/api/auth/session";
import { AgentProvider } from "../providers/agent";

export const metadata: Metadata = {
  title: { template: "%s — Ouranos", default: "Ouranos" },
  description: "Home",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.bskySession.handle);

  return (
    <AgentProvider session={session}>
      <main className="bg-skin-base flex justify-center gap-6 pb-20 md:mt-6 lg:gap-16 animate-fade">
        {profile && <Composer author={profile} />}
        <SidePanel />
        <section className="w-full md:max-w-xl">
          {profile && <TopBar profile={profile} />}
          {children}
        </section>
        {profile && <Aside avatar={profile?.avatar} handle={profile?.handle} />}
        <AppBar />
      </main>
    </AgentProvider>
  );
}
