"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { getFollows } from "@/lib/api/bsky/social";
import Alert from "@/components/feedback/alert/Alert";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useVirtualList from "@/lib/hooks/useVirtualList";
import useInfiniteList from "@/lib/hooks/useInfiniteList";

interface Props {
  handle: string;
}

export default function FollowingContainer(props: Props) {
  const { handle } = props;
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
    queryKey: ["getFollowing", handle],
    queryFn: ({ pageParam }) => getFollows(handle, agent, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.data.cursor,
  });

  // virtualize the list
  const allProfiles = profiles
    ? profiles.pages.flatMap((page) => page?.data.follows)
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
            {allProfiles[item.index] && (
              <ProfileCard profile={allProfiles[item.index]} />
            )}

            {item.index > allProfiles.length - 1 && (
              <section className="flex flex-1 justify-center">
                <AiOutlineLoading3Quarters className="text-xl" />
              </section>
            )}
          </article>
        ))}
      </section>
      {profiles?.pages[0].data.follows.length === 0 && (
        <div className="mx-3 md:mx-0">
          <Alert variant="info" message={`${handle} has no followers... yet`} />
        </div>
      )}
      {isFetching && !isFetchingNextPage && <ProfileCardSkeleton />}
    </section>
  );
}
