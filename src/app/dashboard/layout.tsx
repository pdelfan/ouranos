import AppShell from "@/components/navigation/appShell/AppShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s — Ouranos", default: "Ouranos" },
  description: "Home",
};

interface Props {
  children: React.ReactNode;
}

export default async function Layout(props: Props) {
  return <AppShell>{props.children}</AppShell>;
}
