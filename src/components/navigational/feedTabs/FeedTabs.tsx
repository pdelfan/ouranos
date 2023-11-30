"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import TabItem from "../tabs/TabItem";
import Tabs from "../tabs/Tabs";
import { getSavedFeeds } from "@/lib/api/bsky/feed";
import { usePathname, useSearchParams } from "next/navigation";
import FeedTabsSkeleton from "./FeedTabsSkeleton";
import useHideOnScroll from "@/lib/hooks/useHideOnScroll";
import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function FeedTabs() {
  const agent = useAgent();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const uri = searchParams.get("uri");

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

  const show = useHideOnScroll();

  return (
    <div
      className={`pt-4 sm:pt-2 bg-white border-x-0 border-t-0 border-b sm:border sm:rounded-t-2xl overflow-x-hidden hover:overflow-x-scroll sm:opacity-100 ${
        show ? "translate-y-0" : "-translate-y-20"
      } transition-translate ease-in-out duration-300 sticky top-0 sm:translate-y-0  sm:relative z-50 sm:z-40`}
    >
      {isFetching && <FeedTabsSkeleton />}
      <Tabs>
        {!isFetching && (
          <>
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
          </>
        )}
      </Tabs>
    </div>
  );
}
