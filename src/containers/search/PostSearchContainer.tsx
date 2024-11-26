"use client";

import { searchPosts } from "@/lib/api/bsky/actor";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import SearchPost from "@/components/contentDisplay/searchPost/SearchPost";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAgent } from "@/app/providers/agent";

interface Props {
  query: string;
  sort: "latest" | "top";
}

export default function PostSearchContainer(props: Props) {
  const { query, sort } = props;
  const agent = useAgent();
  const decoded = decodeURIComponent(query);

  const {
    status,
    data: posts,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchPosts", sort, query],
    queryFn: async ({ pageParam }) => {
      return searchPosts(decoded, pageParam, sort, agent);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = posts?.pages.reduce(
    (acc, page) => acc + (page?.posts.length ?? 0),
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
        {posts?.pages
          .flatMap((page) => page?.posts)
          .map((post, i) => (
            <Fragment key={i}>
              {post && <SearchPost key={i} post={post} />}
            </Fragment>
          ))}
      </InfiniteScroll>

      {isFetching && !isFetchingNextPage && <FeedPostSkeleton />}
      {isEmpty && !hasNextPage && (
        <div className="border-skin-base border-t">
          <FeedAlert variant="empty" message={`No posts found`} />
        </div>
      )}
      {error && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      {!isEmpty &&
        !error &&
        !isFetching &&
        !hasNextPage &&
        !isFetchingNextPage && <EndOfFeed />}
    </section>
  );
}
