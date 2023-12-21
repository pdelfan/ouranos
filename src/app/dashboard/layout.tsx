import type { Metadata } from "next";
import SidePanel from "@/components/navigational/sidePanel/SidePanel";
import Aside from "@/components/navigational/aside/Aside";
import AppBar from "@/components/navigational/appBar/AppBar";
import TopBar from "@/components/navigational/topBar/TopBar";
import Composer from "@/components/actions/composer/Composer";
import { getProfile } from "@/lib/api/bsky/actor";
import { getSessionFromServer } from "@/lib/api/auth/session";

export const metadata: Metadata = {
  title: "Ouranos",
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
    <main className="flex justify-center gap-12 pb-20 md:mt-6">
      {profile && <Composer author={profile} />}
      <SidePanel />
      <section className="w-full md:max-w-xl">
        {profile && <TopBar profile={profile} />}
        {children}
      </section>
      <Aside />
      <AppBar />
    </main>
  );
}
