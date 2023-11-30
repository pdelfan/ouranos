import type { Metadata } from "next";
import SidePanel from "@/components/navigational/sidePanel/SidePanel";
import Aside from "@/components/navigational/aside/Aside";
import AppBar from "@/components/navigational/appBar/AppBar";
import TopBar from "@/components/navigational/topBar/TopBar";

export const metadata: Metadata = {
  title: "Ouranos",
  description: "Home",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center gap-12 pb-20 md:mt-6">
      <SidePanel />
      <section className="w-full md:max-w-xl">
        <TopBar />
        {children}
      </section>
      <Aside />
      <AppBar />
    </main>
  );
}
