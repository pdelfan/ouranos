"use client";

import { Tabs, TabsList, TabsTab, Text } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ProfileTabs() {
  const pathname = usePathname();
  const basePath = pathname.split("/").slice(0, 4).join("/");
  const activePath = pathname.replace(basePath, "").substring(1);

  return (
    <Tabs
      defaultValue={"posts"}
      value={activePath === "" ? "posts" : activePath}
    >
      <TabsList>
        <TabsTab value={"posts"}>
          <Text component={Link} href={basePath} fw={500}>
            Posts
          </Text>
        </TabsTab>
        <TabsTab value={"replies"}>
          <Text component={Link} href={`${basePath}/replies`} fw={500}>
            Replies
          </Text>
        </TabsTab>
        <TabsTab value={"media"}>
          <Text component={Link} href={`${basePath}/media`} fw={500}>
            Media
          </Text>
        </TabsTab>
        <TabsTab value={"likes"}>
          {/* TODO: only show this for current user */}
          <Text component={Link} href={`${basePath}/likes`} fw={500}>
            Likes
          </Text>
        </TabsTab>
        <TabsTab value={"feeds"}>
          <Text component={Link} href={`${basePath}/feeds`} fw={500}>
            Feeds
          </Text>
        </TabsTab>
        <TabsTab value={"lists"}>
          <Text component={Link} href={`${basePath}/lists`} fw={500}>
            Lists
          </Text>
        </TabsTab>
        <TabsTab value={"starterPacks"}>
          <Text component={Link} href={`${basePath}/starterPacks`} fw={500}>
            Starter Packs
          </Text>
        </TabsTab>
        <TabsTab value={"atmosphere"}>
          <Text component={Link} href={`${basePath}/atmosphere`} fw={500}>
            Atmosphere
          </Text>
        </TabsTab>
      </TabsList>
    </Tabs>
  );
}
