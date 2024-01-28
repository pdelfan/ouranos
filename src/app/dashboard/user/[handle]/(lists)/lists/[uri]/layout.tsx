import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ouranos — List",
  description: "List",
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
