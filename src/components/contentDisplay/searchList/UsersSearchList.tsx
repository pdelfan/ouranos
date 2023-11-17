"use client";

import { searchProfiles } from "@/lib/api/bsky/actor";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCard from "../profileCard/ProfileCard";
import { Fragment, useEffect } from "react";
import ProfileCardSkeleton from "../profileCard/ProfileCardSkeleton";
import { useInView } from "react-intersection-observer";
import { Icon } from "@iconify/react/dist/iconify.js";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";

interface Props {
  query: string;
}

export default function UsersSearchList(props: Props) {
  const { query } = props;
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
    queryKey: ["searchProfiles", query],
    queryFn: ({ pageParam }) => searchProfiles(agent, query, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
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
      {isFetching && !isFetchingNextPage && (
        <ProfileCardSkeleton rounded={false} />
      )}
      {isFetchingNextPage && (
        <section className="flex flex-1 justify-center mt-3">
          <Icon icon="eos-icons:loading" className="text-xl" />
        </section>
      )}
      <div ref={ref} />
    </section>
  );
}
