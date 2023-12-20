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

  const show = useScrollContext();

  return (
    <>
      <div className="z-40 hidden md:block fixed bg-white top-0 lg:p-5 md:p-5 max-w-xl w-full" />
      <div
        className={`pt-4 md:pt-2 bg-white border-x-0 border-t-0 border-b md:border md:rounded-t-2xl overflow-x-hidden hover:overflow-x-auto md:opacity-100 ${
          show ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
        } transition-all ease-in-out duration-500 sticky top-0 md:top-6 md:translate-y-0  z-50 md:z-50`}
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
    </>
  );
}
