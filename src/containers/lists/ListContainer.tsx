"use client";

import ListHeader from "@/components/contentDisplay/listHeader/ListHeader";
import FeedContainer from "../posts/FeedContainer";
import { useState } from "react";
import ListMembersContainer from "./ListMembersContainer";

interface Props {
  uri: string;
}

export default function ListContainer(props: Props) {
  const { uri } = props;
  const [currentTab, setCurrentTab] = useState<"posts" | "members">("posts");

  const handleTabChange = (tab: "posts" | "members") => {
    setCurrentTab(tab);
  };

  return (
    <section>
      <ListHeader list={uri} />
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={`no-scrollbar border-skin-base flex flex-nowrap gap-3 overflow-auto border border-t-0 ${
          currentTab === "posts" ? "border-b" : "border-b-0"
        } px-3 pt-3`}
      >
        <button
          role="tab"
          onClick={() => handleTabChange("posts")}
          className={`border-b-3 hover:text-primary shrink-0 cursor-pointer px-3 pb-2 font-semibold ${
            currentTab === "posts"
              ? "text-primary border-primary"
              : "text-skin-secondary border-transparent"
          }`}
        >
          Posts
        </button>
        <button
          role="tab"
          onClick={() => handleTabChange("members")}
          className={`border-b-3 hover:text-primary shrink-0 cursor-pointer px-3 pb-2 font-semibold ${
            currentTab === "members"
              ? "text-primary border-primary"
              : "text-skin-secondary border-transparent"
          }`}
        >
          Members
        </button>
      </div>
      {currentTab === "posts" && <FeedContainer feed={uri} mode="list" />}
      {currentTab === "members" && <ListMembersContainer list={uri} />}
    </section>
  );
}
