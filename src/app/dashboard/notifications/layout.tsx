import TopBar from "@/components/navigation/topBar/TopBar";
import { Container } from "@mantine/core";
import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Notifications",
};
interface Props {
  children: React.ReactNode;
}

const BREAD_CRUMBS = [
  { label: "Home", href: "/dashboard" },
  { label: "Notifications", href: "/dashboard/notifications" },
];

export default async function Layout(props: Props) {
  return (
    <Fragment>
      <TopBar breadcrumbs={BREAD_CRUMBS} />
      <Container>{props.children}</Container>
    </Fragment>
  );
}
