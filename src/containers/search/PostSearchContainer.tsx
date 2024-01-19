import { searchPosts } from "@/lib/api/bsky/actor";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import SearchPost from "@/components/contentDisplay/searchPost/SearchPost";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";

interface Props {
  query: string;
}

export default function PostSearchContainer(props: Props) {
  const { query } = props;
  const decoded = decodeURIComponent(query);
  const agent = useAgent();

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
    queryKey: ["searchPosts", query],
    queryFn: ({ pageParam }) => searchPosts(decoded, pageParam, agent),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  const isEmpty =
    !isFetching && !isFetchingNextPage && posts?.pages[0]?.posts?.length === 0;

  const { ref: observerRef, inView } = useInView({ rootMargin: "800px" });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      <section className="flex flex-col">
        {posts?.pages
          .flatMap((page) => page?.posts)
          .map((post, i) => (
            <Fragment key={i}>
              {post && <SearchPost key={i} post={post} />}
            </Fragment>
          ))}
      </section>
      {isEmpty && !hasNextPage && (
        <div className="mx-3 md:mx-0 border-t">
          <FeedAlert variant="empty" message="No posts found" />
        </div>
      )}
      {isFetching && !isFetchingNextPage && <FeedPostSkeleton />}
      {isFetchingNextPage && <LoadingSpinner />}
      {error && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      {!isEmpty &&
        !error &&
        !isFetching &&
        !hasNextPage &&
        !isFetchingNextPage && <EndOfFeed />}
      <div ref={observerRef} />
    </div>
  );
}
