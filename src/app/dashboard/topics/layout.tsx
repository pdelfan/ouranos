import Layout from "@/containers/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics",
  description: "Topics",
};

export default async function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
