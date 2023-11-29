import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ouranos — Notifications",
  description: "Notifications",
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
