"use client";

import TabItem from "../tabs/TabItem";
import Tabs from "../tabs/Tabs";
import { usePathname } from "next/navigation";

export default function FeedTabs() {
  const pathname = usePathname();
  const basePath = pathname.split("/").slice(0, 4).join("/");

  return (
    <Tabs>
      <TabItem
        label="Posts"
        path={`${basePath}`}
        isActive={pathname === `${basePath}`}
      />
      <TabItem
        label="Posts & replies"
        path={`${basePath}/replies`}
        isActive={pathname === `${basePath}/replies`}
      />
      <TabItem
        label="Media"
        path={`${basePath}/media`}
        isActive={pathname === `${basePath}/media`}
      />
      <TabItem
        label="Likes"
        path={`${basePath}/likes`}
        isActive={pathname === `${basePath}/likes`}
      />
    </Tabs>
  );
}
