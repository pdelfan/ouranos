"use client";

import { searchProfiles } from "@/lib/api/bsky/actor";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Icon } from "@iconify/react/dist/iconify.js";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";

interface Props {
  query: string;
}

export default function UserSearchContainer(props: Props) {
  const { query } = props;
  const agent = useAgent();
  const { ref: observerRef, inView } = useInView();

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
    queryFn: ({ pageParam }) => searchProfiles(agent, query, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const isEmpty =
    !isFetching &&
    !isFetchingNextPage &&
    profiles?.pages[0]?.actors?.length === 0;

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
      </section>
      {isEmpty && (
        <div className="mx-3 md:mx-0 border-t">
          <FeedAlert variant="empty" message="No users found" />
        </div>
      )}
      {isFetching && !isFetchingNextPage && (
        <ProfileCardSkeleton rounded={false} />
      )}
      {isFetchingNextPage && (
        <section className="flex flex-1 justify-center mt-3">
          <Icon icon="eos-icons:loading" className="text-xl" />
        </section>
      )}
      <div ref={observerRef} />
    </section>
  );
}
