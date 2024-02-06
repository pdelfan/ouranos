"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { Fragment } from "react";
import { getFollows } from "@/lib/api/bsky/social";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";

interface Props {
  handle: string;
}

export default function FollowingContainer(props: Props) {
  const { handle } = props;
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
    queryKey: ["getFollowing", handle],
    queryFn: ({ pageParam }) => getFollows(handle, agent, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.data.cursor,
  });

  const dataLength = profiles?.pages.reduce(
    (acc, page) => acc + (page?.data.follows.length ?? 0),
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
            .flatMap((page) => page?.data.follows)
            .map((profile, i) => (
              <Fragment key={i}>
                {profile && (
                  <ProfileCard key={profile?.handle + i} profile={profile} />
                )}
              </Fragment>
            ))}
      </InfiniteScroll>

      {isFetching && !isFetchingNextPage && <ProfileCardSkeleton />}
      {isEmpty && (
        <div className="mx-3 md:mx-0">
          <FeedAlert
            variant="empty"
            message={`${handle} has not followed anyone... yet`}
            standalone
          />
        </div>
      )}
    </section>
  );
}
