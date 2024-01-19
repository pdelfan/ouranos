"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getFollowers } from "@/lib/api/bsky/social";
import Alert from "@/components/feedback/alert/Alert";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";

interface Props {
  handle: string;
}

export default function FollowersContainer(props: Props) {
  const { handle } = props;
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
    queryKey: ["getFollowers", handle],
    queryFn: ({ pageParam }) => getFollowers(handle, agent, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.data.cursor,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <section>
      <section className="flex flex-col">
        {profiles &&
          profiles.pages
            .flatMap((page) => page?.data.followers)
            .map((profile, i) => (
              <Fragment key={i}>
                {profile && (
                  <ProfileCard key={profile?.handle + i} profile={profile} />
                )}
              </Fragment>
            ))}
      </section>
      {profiles?.pages[0].data.followers.length === 0 && (
        <div className="mx-3 md:mx-0">
          <Alert variant="info" message={`${handle} has no followers... yet`} />
        </div>
      )}
      {isFetching && !isFetchingNextPage && <ProfileCardSkeleton />}
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} />
    </section>
  );
}
