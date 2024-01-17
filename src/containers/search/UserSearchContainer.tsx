"use client";

import { searchProfiles } from "@/lib/api/bsky/actor";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useVirtualList from "@/lib/hooks/useVirtualList";
import useInfiniteList from "@/lib/hooks/useInfiniteList";

interface Props {
  query: string;
}

export default function UserSearchContainer(props: Props) {
  const { query } = props;
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
    queryKey: ["searchProfiles", query],
    queryFn: ({ pageParam }) => searchProfiles(agent, query, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.cursor,
  });

  // virtualize the list
  const allProfiles = profiles
    ? profiles.pages.flatMap((page) => page?.actors)
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
    profiles?.pages[0]?.actors?.length === 0;

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
            className="p-3 border border-x-0 md:border-x md:first:rounded-t-none
            md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
          >
            {allProfiles[item.index] && (
              <ProfileCard profile={allProfiles[item.index]!} />
            )}

            {item.index > allProfiles.length - 1 && (
              <section className="flex flex-1 justify-center">
                <AiOutlineLoading3Quarters className="text-xl" />
              </section>
            )}
          </article>
        ))}
      </section>
      {isEmpty && (
        <div className="mx-3 md:mx-0 border-t">
          <FeedAlert variant="empty" message="No users found" />
        </div>
      )}
      {isFetching && !isFetchingNextPage && <ProfileCardSkeleton />}
    </section>
  );
}
