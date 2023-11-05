import type { Metadata } from "next";
import SidePanel from "@/components/navigational/sidePanel/SidePanel";

export const metadata: Metadata = {
  title: "Ouranos",
  description: "Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SidePanel />
    </>
  );
}
