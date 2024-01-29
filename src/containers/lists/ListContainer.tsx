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
  const [currenTab, setCurrentTab] = useState<"posts" | "members">("posts");

  const handleTabChange = (tab: "posts" | "members") => {
    setCurrentTab(tab);
  };

  return (
    <section>
      <ListHeader list={uri} />
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={`no-scrollbar flex flex-nowrap gap-3 overflow-auto border border-t-0 ${
          currenTab === "posts" ? "border-b" : "border-b-0"
        } px-3 pt-3`}
      >
        <button
          role="tab"
          onClick={() => handleTabChange("posts")}
          className={`border-b-3 hover:text-primary shrink-0 cursor-pointer px-3 pb-2 font-semibold ${
            currenTab === "posts"
              ? "border-primary-600 text-primary border-primary"
              : "border-transparent text-neutral-500"
          }`}
        >
          Posts
        </button>
        <button
          role="tab"
          onClick={() => handleTabChange("members")}
          className={`border-b-3 hover:text-primary shrink-0 cursor-pointer px-3 pb-2 font-semibold ${
            currenTab === "members"
              ? "border-primary-600 text-primary border-primary"
              : "border-transparent text-neutral-500"
          }`}
        >
          Members
        </button>
      </div>
      {currenTab === "posts" && <FeedContainer feed={uri} mode="list" />}
      {currenTab === "members" && <ListMembersContainer list={uri} />}
    </section>
  );
}
