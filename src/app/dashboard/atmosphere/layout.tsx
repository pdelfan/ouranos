import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Atmosphere",
  description: "Atmosphere",
};
interface Props {
  children: React.ReactNode;
}

export default async function Layout(props: Props) {
  return <Fragment>{props.children}</Fragment>;
}
