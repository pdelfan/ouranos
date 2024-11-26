"use client";

import TabItem from "../tabs/TabItem";
import Tabs from "../tabs/Tabs";
import { getSavedFeeds } from "@/lib/api/bsky/feed";
import { usePathname, useSearchParams } from "next/navigation";
import FeedTabsSkeleton from "./FeedTabsSkeleton";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useScrollContext } from "@/app/providers/scroll";
import { useAgent } from "@/app/providers/agent";

export default function FeedTabs() {
  const agent = useAgent();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const uri = searchParams.get("uri");
  const val = useScrollContext();
  const canUpdate = typeof window !== "undefined" && window.innerWidth < 768;

  const {
    status,
    data: savedFeeds,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["savedFeeds"],
    queryFn: async () => {
      return getSavedFeeds(agent);
    },
  });

  return (
    <>
      <div className="bg-skin-base fixed top-0 z-40 hidden w-full max-w-xl md:block md:p-5 lg:p-5" />
      <div
        className={`bg-skin-base border-skin-base sticky top-[3.2rem] z-50 overflow-x-hidden border-x-0 border-b border-t-0 transition-all ease-linear hover:overflow-x-auto md:top-6 md:z-50 md:rounded-t-2xl md:border md:opacity-100`}
        style={{
          opacity: canUpdate ? `${100 - (val ?? 0)}%` : "100%",
          transform: canUpdate
            ? `translateY(-${val ?? 0}%)`
            : "translateY(-0%)",
        }}
      >
        {isFetching && <FeedTabsSkeleton />}
        {!isFetching && savedFeeds && (
          <Tabs>
            <TabItem
              key={"Following"}
              isActive={pathname === "/dashboard/home"}
              label={"Following"}
              path={"/dashboard/home"}
            />
            {savedFeeds &&
              savedFeeds
                .filter((feed) => feed.pinned)
                .map((feed) => {
                  return (
                    <TabItem
                      key={feed.cid}
                      isActive={feed.uri === uri}
                      label={feed.displayName}
                      path={{
                        pathname: `/dashboard/home/${encodeURIComponent(
                          feed.uri.split(":")[3].split("/")[0],
                        )}`,
                        query: { uri: feed.uri },
                      }}
                    />
                  );
                })}
          </Tabs>
        )}
      </div>
    </>
  );
}
