"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import TabItem from "../tabs/TabItem";
import Tabs from "../tabs/Tabs";
import { getSavedFeeds } from "@/lib/api/bsky/feed";
import { usePathname, useSearchParams } from "next/navigation";
import FeedTabsSkeleton from "./FeedTabsSkeleton";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useScrollContext } from "@/app/providers/scroll";

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
    queryFn: () => getSavedFeeds(agent),
  });

  return (
    <>
      <div className="z-40 hidden md:block fixed bg-white top-0 lg:p-5 md:p-5 max-w-xl w-full" />
      <div
        className={`bg-white border-x-0 border-t-0 border-b md:border md:rounded-t-2xl overflow-x-hidden hover:overflow-x-auto md:opacity-100 sticky top-[3.2rem] md:top-6 z-50 md:z-50 ease-linear transition-all`}
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
                          feed.uri.split(":")[3].split("/")[0]
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
