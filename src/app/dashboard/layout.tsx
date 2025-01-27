import { Shell } from "@/components/navigation/shell/Shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s — Ouranos", default: "Ouranos" },
  description: "Home",
};

interface Props {
  children: React.ReactNode;
}

export default async function Layout(props: Props) {
  return <Shell>{props.children}</Shell>;
}
