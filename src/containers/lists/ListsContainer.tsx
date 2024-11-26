"use client";

import { useAgent } from "@/app/providers/agent";
import ListItem from "@/components/contentDisplay/listItem/ListItem";
import ListsSkeleton from "@/components/contentDisplay/lists/ListsSkeleton";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import { getProfile } from "@/lib/api/bsky/actor";
import { getLists } from "@/lib/api/bsky/list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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
    queryFn: async ({ pageParam }) => {
      const profile = await getProfile(handle, agent);
      if (!profile) throw new Error("Could not get user id to show lists");
      return getLists(profile.did, pageParam, agent);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = lists?.pages.reduce(
    (acc, page) => acc + (page?.lists.length ?? 0),
    0,
  );

  const isEmpty = !isFetching && !isFetchingNextPage && dataLength === 0;

  return (
    <section>
      <InfiniteScroll
        dataLength={dataLength ?? 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<LoadingSpinner />}
        scrollThreshold={0.8}
        className="no-scrollbar flex flex-col"
      >
        {lists?.pages
          .flatMap((page) => page?.lists)
          .map((list, i) => (
            <Fragment key={i}>
              {list && <ListItem rounded={false} list={list} />}
            </Fragment>
          ))}
      </InfiniteScroll>

      {isFetching && !isFetchingNextPage && <ListsSkeleton rounded={false} />}
      {isEmpty && !hasNextPage && (
        <FeedAlert variant="empty" message={`${handle} has no lists`} />
      )}
      {error && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
    </section>
  );
}
