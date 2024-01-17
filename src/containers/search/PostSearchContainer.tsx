import { searchPosts } from "@/lib/api/bsky/actor";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import FeedPostSkeleton, {
  Skeleton,
} from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import SearchPost from "@/components/contentDisplay/searchPost/SearchPost";
import useVirtualList from "@/lib/hooks/useVirtualList";
import useInfiniteList from "@/lib/hooks/useInfiniteList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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

  const allPosts = posts ? posts?.pages.flatMap((page) => page?.posts) : [];

  const { virtualizer, viewportRef, virtualMap, getVirtualItems } =
    useVirtualList({
      items: allPosts,
      options: {
        size: 500,
        overscan: 2,
        scrollMargin: 200,
        hasNextPage: hasNextPage,
      },
    });

  useInfiniteList({
    items: allPosts,
    fetchNextPage: fetchNextPage,
    getVirtualItems: getVirtualItems,
    hasNextPage: hasNextPage,
    isFetchingNextPage: isFetchingNextPage,
  });

  const isEmpty =
    !isFetching && !isFetchingNextPage && posts?.pages[0]?.posts?.length === 0;

  return (
    <section>
      <section
        ref={viewportRef}
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        <section className="flex flex-col">
          {virtualMap((item) => (
            <article
              key={item.key}
              data-index={item.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                transform: `translateY(${
                  item.start - virtualizer.options.scrollMargin
                }px)`,
                width: "100%",
              }}
              className="p-3 border border-x-0 md:border-x last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:cursor-pointer"
            >
              {allPosts[item.index] && (
                <SearchPost
                  key={allPosts[item.index]?.uri}
                  post={allPosts[item.index]!}
                />
              )}

              {item.index > allPosts.length - 1 && (
                <section className="flex flex-1 justify-center">
                  <AiOutlineLoading3Quarters className="text-xl" />
                </section>
              )}
            </article>
          ))}
        </section>
      </section>
      {isEmpty && !hasNextPage && (
        <div className="mx-3 md:mx-0 border-t">
          <FeedAlert variant="empty" message="No posts found" />
        </div>
      )}
      {isFetching && !isFetchingNextPage && <FeedPostSkeleton />}
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
