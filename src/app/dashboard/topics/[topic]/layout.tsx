import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topic",
  description: "Topic",
};

export default async function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
