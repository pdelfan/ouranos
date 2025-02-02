import TopBar from "@/components/navigation/topBar/TopBar";
import FeedTabs from "@/features/feeds/components/feedTabs/FeedTabs";
import { Fragment } from "react";

const BREAD_CRUMBS = [{ label: "Home", href: "/dashboard" }];

export default async function Dashboard() {
  return (
    <Fragment>
      <TopBar breadcrumbs={BREAD_CRUMBS} />
      <FeedTabs />
    </Fragment>
  );
}
