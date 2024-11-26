"use client";

import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { getMutedUsers } from "@/lib/api/bsky/social";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import MutedUsersContainerSkeleton from "./MutedUsersContainerSkeleton";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAgent } from "@/app/providers/agent";

export default function MutedUsersContainer() {
  const agent = useAgent();
  const {
    status,
    data: profiles,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getMutedUsers"],
    queryFn: async ({ pageParam }) => {
      return getMutedUsers(agent, pageParam);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  const dataLength = profiles?.pages.reduce(
    (acc, page) => acc + (page?.mutes.length ?? 0),
    0,
  );

  const isEmpty = !isFetching && !isFetchingNextPage && dataLength === 0;

  if (isFetching && !isFetchingNextPage) return <MutedUsersContainerSkeleton />;

  return (
    <>
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        Muted Users
      </h2>
      <section className="mt-2 flex flex-col">
        <InfiniteScroll
          dataLength={dataLength ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<LoadingSpinner />}
          scrollThreshold={0.8}
          className="no-scrollbar flex flex-col"
        >
          {profiles &&
            profiles.pages
              .flatMap((page) => page.mutes)
              .map((profile, i) => (
                <Fragment key={i}>
                  {profile && (
                    <ProfileCard key={profile?.handle + i} profile={profile} />
                  )}
                </Fragment>
              ))}
        </InfiniteScroll>

        {isEmpty && (
          <div className="mx-3 md:mx-0">
            <FeedAlert
              variant="empty"
              message="You have not muted any users... yet"
              standalone={true}
            />
          </div>
        )}
      </section>
    </>
  );
}
