"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton, {
  Skeleton,
} from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getFollows } from "@/lib/api/bsky/social";
import Alert from "@/components/feedback/alert/Alert";

interface Props {
  handle: string;
}

export default function FollowingContainer(props: Props) {
  const { handle } = props;
  const agent = useAgent();
  const { ref, inView } = useInView();

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
            .flatMap((page) => page?.data.follows)
            .map((profile, i) => (
              <Fragment key={i}>
                {profile && (
                  <ProfileCard key={profile?.handle + i} profile={profile} />
                )}
              </Fragment>
            ))}
      </section>
      {profiles?.pages[0].data.follows.length === 0 && (
        <div className="mx-3 md:mx-0">
          <Alert
            variant="info"
            message={`${handle} has not followed anyone... yet`}
          />
        </div>
      )}
      {isFetching && !isFetchingNextPage && <ProfileCardSkeleton />}
      {isFetchingNextPage && (
        <div>
          <Skeleton />
          <Skeleton />
        </div>
      )}
      <div ref={ref} />
    </section>
  );
}
