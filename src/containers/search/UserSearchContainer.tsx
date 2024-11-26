"use client";

import { searchProfiles } from "@/lib/api/bsky/actor";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAgent } from "@/app/providers/agent";

interface Props {
  query: string;
}

export default function UserSearchContainer(props: Props) {
  const { query } = props;
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
    queryKey: ["searchProfiles", query],
    queryFn: async ({ pageParam }) => {
      return searchProfiles(agent, query, pageParam);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = profiles?.pages.reduce(
    (acc, page) => acc + (page?.actors.length ?? 0),
    0,
  );

  const isEmpty = !isFetching && !isFetchingNextPage && dataLength === 0;

  return (
    <section>
      <InfiniteScroll
        dataLength={dataLength ?? 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<LoadingSpinner />}
        className="no-scrollbar flex flex-col"
      >
        {profiles &&
          profiles.pages
            .flatMap((page) => page?.actors)
            .map((profile, i) => (
              <Fragment key={i}>
                {profile && (
                  <ProfileCard
                    key={profile?.handle + i}
                    profile={profile}
                    rounded={false}
                  />
                )}
              </Fragment>
            ))}
      </InfiniteScroll>

      {isEmpty && (
        <div className="border-skin-base border-t">
          <FeedAlert variant="empty" message={`No users found for ${query}`} />
        </div>
      )}
      {isFetching && !isFetchingNextPage && (
        <ProfileCardSkeleton rounded={false} />
      )}
    </section>
  );
}
