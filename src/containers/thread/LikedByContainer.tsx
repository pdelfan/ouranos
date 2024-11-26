"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { Fragment } from "react";
import { getPostLikes } from "@/lib/api/bsky/feed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAgent } from "@/app/providers/agent";

interface Props {
  handle: string;
  id: string;
}

export default function LikedByContainer(props: Props) {
  const { handle, id } = props;
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
    queryKey: ["getPostLikes", id],
    queryFn: async ({ pageParam }) => {
      const { data } = await agent.resolveHandle({ handle });
      if (!data) return;
      const uri = `at://${data.did}/app.bsky.feed.post/${id}`;
      return getPostLikes(agent, uri, pageParam);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = profiles?.pages.reduce(
    (acc, page) => acc + (page?.likes.length ?? 0),
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
        scrollThreshold={0.8}
        className="no-scrollbar flex flex-col"
      >
        {profiles &&
          profiles.pages
            .flatMap((page) => page?.likes)
            .map((profile, i) => (
              <Fragment key={i}>
                {profile && (
                  <ProfileCard
                    key={profile?.actor.handle + i}
                    profile={profile.actor}
                  />
                )}
              </Fragment>
            ))}
      </InfiniteScroll>

      {isFetching && !isFetchingNextPage && <ProfileCardSkeleton />}
      {isEmpty && !hasNextPage && (
        <div className="px-3 md:px-0">
          <FeedAlert
            variant="empty"
            message="No one has liked this post... yet"
            standalone={true}
          />
        </div>
      )}
    </section>
  );
}
