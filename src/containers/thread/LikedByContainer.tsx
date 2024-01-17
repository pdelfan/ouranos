"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { getPostLikes } from "@/lib/api/bsky/feed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useVirtualList from "@/lib/hooks/useVirtualList";
import useInfiniteList from "@/lib/hooks/useInfiniteList";

interface Props {
  handle: string;
  id: string;
}

export default function LikedByContainer(props: Props) {
  const { handle, id } = props;

  const agent = useAgent();

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
    queryKey: ["getPostLikes", id],
    queryFn: async ({ pageParam }) => {
      const { data } = await agent.resolveHandle({ handle });
      if (!data) return;
      const uri = `at://${data.did}/app.bsky.feed.post/${id}`;
      return getPostLikes(agent, uri, pageParam);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  // virtualize the list
  const allProfiles = profiles
    ? profiles.pages.flatMap((page) => page?.likes)
    : [];

  const { virtualizer, viewportRef, virtualMap, getVirtualItems } =
    useVirtualList({
      items: allProfiles,
      options: {
        size: 50,
        overscan: 10,
        hasNextPage,
      },
    });

  useInfiniteList({
    items: allProfiles,
    fetchNextPage,
    getVirtualItems: getVirtualItems,
    hasNextPage,
    isFetchingNextPage,
  });

  const isEmpty =
    !isFetching &&
    !isFetchingNextPage &&
    profiles?.pages[0]?.likes.length === 0;

  return (
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
            className="p-3 border border-x-0 md:border-x md:first:rounded-t-2xl
            md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
          >
            {allProfiles[item.index]?.actor && (
              <ProfileCard profile={allProfiles[item.index]?.actor!} />
            )}

            {item.index > allProfiles.length - 1 && (
              <section className="flex flex-1 justify-center">
                <AiOutlineLoading3Quarters className="text-xl" />
              </section>
            )}
          </article>
        ))}
      </section>
      {isFetching && !isFetchingNextPage && <ProfileCardSkeleton />}
      {isEmpty && !hasNextPage && (
        <div className="px-3 md:px-0">
          <FeedAlert
            variant="empty"
            message="No one has liked this post... yet"
            standalone={true}
          />
        </div>
      )}
    </section>
  );
}
