"use client";

import { getLists } from "@/lib/api/bsky/list";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Fragment, useEffect } from "react";
import ListItem from "../listItem/ListItem";
import { useInView } from "react-intersection-observer";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import ListsSkeleton from "./ListsSkeleton";

export default function Lists() {
  const agent = useAgent();
  const { data: session } = useSession();

  const {
    status,
    data: lists,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["lists"],
    queryFn: ({ pageParam }) => {
      if (!session?.user.id) return;
      return getLists(session.user.id, pageParam, agent);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const isEmpty =
    !isFetching && !isFetchingNextPage && lists?.pages[0]?.lists?.length === 0;

  const { ref: observerRef, inView } = useInView({ rootMargin: "800px" });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      <section className="flex flex-col">
        {lists?.pages
          .flatMap((page) => page?.lists)
          .map((list, i) => (
            <Fragment key={i}>{list && <ListItem list={list} />}</Fragment>
          ))}
      </section>
      {isEmpty && !hasNextPage && (
        <div className="border-t">
          <FeedAlert variant="empty" message="No lists found" />
        </div>
      )}
      {isFetching && !isFetchingNextPage && <ListsSkeleton />}
      {isFetchingNextPage && <LoadingSpinner />}
      {error && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      <div ref={observerRef} />
    </div>
  );
}
