"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getPostReposts } from "@/lib/api/bsky/feed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";

interface Props {
  handle: string;
  id: string;
}

export default function RepostedByContainer(props: Props) {
  const { handle, id } = props;

  const agent = useAgent();
  const { ref, inView } = useInView({ rootMargin: "100px" });

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
    queryKey: ["getPostReposts", id],
    queryFn: async ({ pageParam }) => {
      const { data } = await agent.resolveHandle({ handle });
      if (!data) return;
      const uri = `at://${data.did}/app.bsky.feed.post/${id}`;
      return getPostReposts(agent, uri, pageParam);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const isEmpty =
    !isFetching &&
    !isFetchingNextPage &&
    profiles?.pages[0]?.repostedBy.length === 0;

  return (
    <section>
      <section className="flex flex-col">
        {profiles &&
          profiles.pages
            .flatMap((page) => page?.repostedBy)
            .map((profile, i) => (
              <Fragment key={i}>
                {profile && (
                  <ProfileCard key={profile.did + i} profile={profile} />
                )}
              </Fragment>
            ))}
      </section>
      {isFetching && !isFetchingNextPage && <ProfileCardSkeleton />}
      {isFetchingNextPage && <LoadingSpinner />}
      {isEmpty && !hasNextPage && (
        <div className="px-3 md:px-0">
          <FeedAlert
            variant="empty"
            message="No one has reposted... yet"
            standalone={true}
          />
        </div>
      )}
      <div ref={ref} />
    </section>
  );
}
