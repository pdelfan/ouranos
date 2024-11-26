"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import SearchPost from "@/components/contentDisplay/searchPost/SearchPost";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPostQuotes } from "@/lib/api/bsky/feed";
import { useAgent } from "@/app/providers/agent";

interface Props {
  id: string;
  handle: string;
}

export default function QuotesContainer(props: Props) {
  const { id, handle } = props;
  const agent = useAgent();

  const {
    status,
    data: quotes,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["postQuotes", id],
    queryFn: async ({ pageParam }) => {
      const { data } = await agent.resolveHandle({ handle });
      if (!data) return;
      const uri = `at://${data.did}/app.bsky.feed.post/${id}`;
      return getPostQuotes(agent, uri, pageParam);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const dataLength = quotes?.pages.reduce(
    (acc, page) => acc + (page?.posts.length ?? 0),
    0,
  );

  const isEmpty = !isFetching && !isFetchingNextPage && dataLength === 0;

  return (
    <div>
      <InfiniteScroll
        dataLength={dataLength ?? 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<LoadingSpinner />}
        scrollThreshold={0.8}
        className="no-scrollbar flex flex-col"
      >
        {quotes?.pages
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
          <FeedAlert
            variant="empty"
            message="No one has quoted this post... yet"
          />
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
    </div>
  );
}
