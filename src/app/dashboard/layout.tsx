import type { Metadata } from "next";
import SidePanel from "@/components/navigational/sidePanel/SidePanel";
import Aside from "@/components/navigational/aside/Aside";

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
    <main className="flex justify-center gap-12 m-6">
      <SidePanel />
      {children}
      <Aside />
    </main>
  );
}
