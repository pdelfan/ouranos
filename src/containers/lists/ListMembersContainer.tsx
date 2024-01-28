"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import { getListMembers } from "@/lib/api/bsky/list";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";

interface Props {
  list: string;
}

export default function ListMembersContainer(props: Props) {
  const { list } = props;
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
    queryKey: ["list members", list],
    queryFn: ({ pageParam }) => getListMembers(agent, list, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.cursor,
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
            .flatMap((page) => page?.items)
            .map((item, i) => (
              <Fragment key={i}>
                {item && (
                  <ProfileCard
                    key={item.subject.did + i}
                    profile={item.subject}
                    rounded={false}
                  />
                )}
              </Fragment>
            ))}
      </section>
      {profiles?.pages[0].items.length === 0 && (
        <div className="mx-3 border-t md:mx-0">
          <FeedAlert variant="empty" message="No members found" />
        </div>
      )}
      {isFetching && !isFetchingNextPage && (
        <ProfileCardSkeleton rounded={false} />
      )}
      {isFetchingNextPage && <LoadingSpinner />}
      {error && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      <div ref={ref} />
    </section>
  );
}
