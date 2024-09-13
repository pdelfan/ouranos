import Layout from "@/containers/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lists",
  description: "Lists",
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
