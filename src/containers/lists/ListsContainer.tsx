"use client";

import ListItem from "@/components/contentDisplay/listItem/ListItem";
import ListsSkeleton from "@/components/contentDisplay/lists/ListsSkeleton";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import { getLists } from "@/lib/api/bsky/list";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  handle: string;
}

export default function ListsContainer(props: Props) {
  const { handle } = props;
  const agent = useAgent();
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
    queryKey: ["user lists", handle],
    queryFn: ({ pageParam }) => getLists(handle, pageParam, agent),
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
    <section>
      <section className="flex flex-col">
        {lists?.pages
          .flatMap((page) => page?.lists)
          .map((list, i) => (
            <Fragment key={i}>
              {list && <ListItem rounded={false} list={list} />}
            </Fragment>
          ))}
      </section>
      {isEmpty && !hasNextPage && (
        <FeedAlert variant="empty" message={`${handle} has no lists`} />
      )}
      {isFetching && !isFetchingNextPage && <ListsSkeleton rounded={false} />}
      {isFetchingNextPage && <LoadingSpinner />}
      {error && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      <div ref={observerRef} />
    </section>
  );
}
