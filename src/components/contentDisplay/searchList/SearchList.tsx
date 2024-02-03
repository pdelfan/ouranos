"use client";

import { useState } from "react";
import PostSearchContainer from "@/containers/search/PostSearchContainer";
import UserSearchContainer from "@/containers/search/UserSearchContainer";
import { useSession } from "next-auth/react";

interface Props {
  query: string;
}

export default function SearchList(props: Props) {
  const { query } = props;
  const [currenTab, setCurrentTab] = useState<"posts" | "users">("posts");
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
    <section className="mt-5">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="no-scrollbar flex flex-nowrap gap-3 overflow-auto px-3 md:px-0"
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
          onClick={() => handleTabChange("users")}
          className={`border-b-3 hover:text-primary shrink-0 cursor-pointer px-3 pb-2 font-semibold ${
            currenTab === "users"
              ? "border-primary-600 text-primary border-primary"
              : "border-transparent text-neutral-500"
          }`}
        >
          Users
        </button>
      </div>

      {currenTab === "posts" && (
        <PostSearchContainer query={onSearchPost(query)} />
      )}
      {currenTab === "users" && <UserSearchContainer query={query} />}
    </section>
  );
}
