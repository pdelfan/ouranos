import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore",
  description: "Explore",
};
interface Props {
  children: React.ReactNode;
}

export default async function Layout(props: Props) {
  return props.children;
}
