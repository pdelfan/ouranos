"use client";

import { useState } from "react";
import UsersSearchList from "./UsersSearchList";
import PostsSearchList from "./PostsSearchList";

interface Props {
  query: string;
}

export default function SearchList(props: Props) {
  const { query } = props;
  const [currenTab, setCurrentTab] = useState<"posts" | "users">("posts");

  const handleTabChange = (tab: "posts" | "users") => {
    setCurrentTab(tab);
  };

  return (
    <section className="mt-5">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex flex-nowrap gap-3 px-3 md:px-0 overflow-auto no-scrollbar"
      >
        <button
          role="tab"
          onClick={() => handleTabChange("posts")}
          className={`shrink-0 border-b-3 px-3 pb-2 font-semibold hover:text-primary cursor-pointer ${
            currenTab === "posts"
              ? "border-primary-600 text-primary border-primary"
              : "border-transparent text-neutral-500"
          }`}
        >
          Posts
        </button>
        <button
          role="tab"
          onClick={() => handleTabChange("users")}
          className={`shrink-0 border-b-3 px-3 pb-2 font-semibold hover:text-primary cursor-pointer ${
            currenTab === "users"
              ? "border-primary-600 text-primary border-primary"
              : "border-transparent text-neutral-500"
          }`}
        >
          Users
        </button>
      </div>

      {currenTab === "posts" && <PostsSearchList query={query} />}
      {currenTab === "users" && <UsersSearchList query={query} />}
    </section>
  );
}
