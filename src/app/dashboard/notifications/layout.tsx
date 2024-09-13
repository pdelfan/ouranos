import Layout from "@/containers/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Notifications",
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
