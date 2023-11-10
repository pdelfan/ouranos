"use client";

import useAgent from "@/lib/hooks/useAgent";
import TabItem from "../tabs/TabItem";
import Tabs from "../tabs/Tabs";
import { getSavedFeeds } from "@/lib/api/bsky/feed";
import useSWR from "swr";
import { usePathname, useSearchParams } from "next/navigation";
import FeedTabsSkeleton from "./FeedTabsSkeleton";

export default function FeedTabs() {
  const agent = useAgent();
  const { data: savedFeeds, isLoading } = useSWR("savedFeeds", () =>
    getSavedFeeds(agent)
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const uri = searchParams.get("uri");

  return (
    <div className="sticky top-0 md:relative pt-2 bg-white border sm:border-t sm:rounded-t-2xl z-50 over">
      {isLoading && <FeedTabsSkeleton />}
      <Tabs>
        {!isLoading && (
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
