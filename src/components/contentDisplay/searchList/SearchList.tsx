"use client";

import { useState } from "react";
import PostSearchContainer from "@/containers/search/PostSearchContainer";
import UserSearchContainer from "@/containers/search/UserSearchContainer";
import { useSession } from "next-auth/react";
import Tabs from "@/components/navigational/tabs/Tabs";
import TabItem from "@/components/navigational/tabs/TabItem";

interface Props {
  query: string;
}

export default function SearchList(props: Props) {
  const { query } = props;
  const [currentTab, setCurrentTab] = useState<"posts" | "users">("posts");
  const { data: session } = useSession();

  const handleTabChange = (tab: "posts" | "users") => {
    setCurrentTab(tab);
  };

  const onSearchPost = (query: string) => {
    if (query.trim() === "from:me" && session?.user.handle) {
      return `from:${session.user.handle}`;
    }

    return query;
  };

  return (
    <section>
      <Tabs>
        <TabItem
          asButton
          onClick={() => handleTabChange("posts")}
          label="Posts"
          isActive={currentTab === "posts"}
        />

        <TabItem
          asButton
          onClick={() => handleTabChange("users")}
          label="Users"
          isActive={currentTab === "users"}
        />
      </Tabs>

      {currentTab === "posts" && (
        <PostSearchContainer query={onSearchPost(query)} />
      )}
      {currentTab === "users" && <UserSearchContainer query={query} />}
    </section>
  );
}
