"use client";

import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { getBlockedUsers } from "@/lib/api/bsky/social";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import BlockedUsersContainerSkeleton from "./BlockedUsersContainerSkeleton";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useVirtualList from "@/lib/hooks/useVirtualList";
import useInfiniteList from "@/lib/hooks/useInfiniteList";

export default function BlockedUsersContainer() {
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
    queryKey: ["getBlockedUsers"],
    queryFn: ({ pageParam }) => getBlockedUsers(agent, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  const allProfiles = profiles
    ? profiles.pages.flatMap((page) => page.blocks)
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

  if (isFetching && !isFetchingNextPage) {
    return <BlockedUsersContainerSkeleton />;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mx-3 md:mx-0 mb-2">
        Blocked Users
      </h2>
      <section className="flex flex-col mt-2">
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

            {profiles && profiles.pages[0].blocks.length === 0 && (
              <div className="mx-3 md:mx-0">
                <FeedAlert
                  variant="empty"
                  message="You have not blocked any users... yet"
                  standalone={true}
                />
              </div>
            )}
          </section>
        </section>
      </section>
    </>
  );
}
