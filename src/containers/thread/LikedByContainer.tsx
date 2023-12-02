"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getPostLikes } from "@/lib/api/bsky/feed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";

interface Props {
  handle: string;
  id: string;
}

export default function LikedByContainer(props: Props) {
  const { handle, id } = props;

  const agent = useAgent();
  const { ref, inView } = useInView();

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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const isEmpty =
    !isFetching &&
    !isFetchingNextPage &&
    profiles?.pages[0]?.likes.length === 0;

  return (
    <section>
      <section className="flex flex-col">
        {profiles &&
          profiles.pages
            .flatMap((page) => page?.likes)
            .map((profile, i) => (
              <Fragment key={i}>
                {profile && (
                  <ProfileCard
                    key={profile?.actor.handle + i}
                    profile={profile.actor}
                  />
                )}
              </Fragment>
            ))}
      </section>
      {isFetching && !isFetchingNextPage && <ProfileCardSkeleton />}
      {isFetchingNextPage && (
        <section className="flex flex-1 justify-center mt-3">
          <Icon icon="eos-icons:loading" className="text-xl" />
        </section>
      )}
      {isEmpty && !hasNextPage && (
        <div className="px-3 md:px-0">
          <FeedAlert
            variant="empty"
            message="No one has liked this post... yet"
            standalone={true}
          />
        </div>
      )}
      <div ref={ref} />
    </section>
  );
}
