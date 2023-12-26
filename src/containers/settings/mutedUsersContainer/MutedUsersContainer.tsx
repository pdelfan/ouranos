"use client";

import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { getMutedUsers } from "@/lib/api/bsky/social";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import MutedUsersContainerSkeleton from "./MutedUsersContainerSkeleton";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function MutedUsersContainer() {
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
    queryKey: ["getMutedUsers"],
    queryFn: ({ pageParam }) => getMutedUsers(agent, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isFetching && !isFetchingNextPage) return <MutedUsersContainerSkeleton />;

  return (
    <>
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">Muted Users</h2>
      <section className="flex flex-col mt-2">
        <section>
          <section className="flex flex-col">
            {profiles &&
              profiles.pages
                .flatMap((page) => page.mutes)
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
            {profiles && profiles.pages[0].mutes.length === 0 && (
              <div className="mx-3 md:mx-0">
                <FeedAlert
                  variant="empty"
                  message="You have not muted any users... yet"
                  standalone={true}
                />
              </div>
            )}
          </section>
          {isFetchingNextPage && (
            <section className="flex flex-1 justify-center mt-3">
              <AiOutlineLoading3Quarters className="text-xl" />
            </section>
          )}
          <div ref={ref} />
        </section>
      </section>
    </>
  );
}
