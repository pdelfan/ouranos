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
    <main className="flex justify-center gap-12 sm:m-6">
      <SidePanel />
      <section className="w-full sm:max-w-xl">{children}</section>
      <Aside />
    </main>
  );
}
