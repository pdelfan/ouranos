import FeedTabs from "@/components/navigational/feedTabs/FeedTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ouranos — Home",
  description: "Home",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FeedTabs />
      {children}
    </>
  );
}
