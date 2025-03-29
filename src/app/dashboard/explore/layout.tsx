import TopBar from "@/components/navigation/topBar/TopBar";
import type { Metadata } from "next";
import { Fragment } from "react";
import { Container } from "@mantine/core";

export const metadata: Metadata = {
  title: "Explore",
  description: "Explore",
};
interface Props {
  children: React.ReactNode;
}

const BREAD_CRUMBS = [
  { label: "Home", href: "/dashboard" },
  { label: "Explore", href: "/dashboard/explore" },
];

export default async function Layout(props: Props) {
  return (
    <Fragment>
      <TopBar breadcrumbs={BREAD_CRUMBS} />
      <Container>{props.children}</Container>
    </Fragment>
  );
}
