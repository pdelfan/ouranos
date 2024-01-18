"use client";

import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { Skeleton } from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import { getBlockedUsers } from "@/lib/api/bsky/social";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import BlockedUsersContainerSkeleton from "./BlockedUsersContainerSkeleton";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";

export default function BlockedUsersContainer() {
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
    queryKey: ["getBlockedUsers"],
    queryFn: ({ pageParam }) => getBlockedUsers(agent, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isFetching && !isFetchingNextPage) {
    return <BlockedUsersContainerSkeleton />;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
        Blocked Users
      </h2>
      <section className="flex flex-col mt-2">
        <section>
          <section className="flex flex-col">
            {profiles &&
              profiles.pages
                .flatMap((page) => page.blocks)
                .map((profile, i) => (
                  <Fragment key={i}>
                    {profile && (
                      <ProfileCard
                        key={profile?.handle + i}
                        profile={profile}
                      />
                    )}
                  </Fragment>
                ))}
          </section>
          {profiles && profiles.pages[0].blocks.length === 0 && (
            <div className="mx-3 md:mx-0">
              <FeedAlert
                variant="empty"
                message="You have not blocked any users... yet"
                standalone={true}
              />
            </div>
          )}
          {isFetchingNextPage && (
            <div>
              <Skeleton />
              <Skeleton />
            </div>
          )}
          <div ref={ref} />
        </section>
      </section>
    </>
  );
}
