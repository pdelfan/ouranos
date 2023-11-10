import FeedTabs from "@/components/navigational/feedTabs/FeedTabs";
import { getTimeline } from "@/lib/api/bsky/feed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ouranos",
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
