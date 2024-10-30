"use client";

import { useState } from "react";
import TabItem from "@/components/navigational/tabs/TabItem";
import Tabs from "@/components/navigational/tabs/Tabs";
import PostSearchContainer from "../search/PostSearchContainer";

interface Props {
  url: string;
}

export default function TopicContainer(props: Props) {
  const { url } = props;
  const [currentTab, setCurrentTab] = useState<"top" | "latest">("top");

  const handleTabChange = (tab: "top" | "latest") => {
    setCurrentTab(tab);
  };

  return (
    <section>
      <Tabs className="md:border-x border-skin-base">
        <TabItem
          asButton
          onClick={() => handleTabChange("top")}
          label="Top"
          isActive={currentTab === "top"}
        />
        <TabItem
          asButton
          onClick={() => handleTabChange("latest")}
          label="Latest"
          isActive={currentTab === "latest"}
        />
      </Tabs>

      {currentTab === "latest" && (
        <PostSearchContainer query={url} sort={currentTab} />
      )}
      {currentTab === "top" && (
        <PostSearchContainer query={url} sort={currentTab} />
      )}
    </section>
  );
}
