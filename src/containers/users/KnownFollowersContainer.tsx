"use client";

import ProfileCardSkeleton from "@/components/contentDisplay/profileCard/ProfileCardSkeleton";
import ProfileCard from "@/components/contentDisplay/profileCard/ProfileCard";
import { Fragment } from "react";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import useKnownFollowers from "@/lib/hooks/bsky/social/useKnownFollowers";

interface Props {
  handle: string;
}

export default function KnownFollowersContainer(props: Props) {
  const { handle } = props;
  const {
    knownFollowers,
    isKnownFollowersEmpty,
    knownFollowersError,
    fetchKnownFollowersNextPage,
    isLoadingKnownFollowers,
    isFetchingKnownFollowers,
    isFetchingKnownFollowersNextPage,
    hasKnownFollowersNextPage,
  } = useKnownFollowers({ handle });

  const dataLength = knownFollowers?.pages.reduce(
    (acc, page) => acc + (page?.followers.length ?? 0),
    0,
  );

  const isEmpty =
    !isFetchingKnownFollowers &&
    !isFetchingKnownFollowersNextPage &&
    dataLength === 0;

  return (
    <section>
      <InfiniteScroll
        dataLength={dataLength ?? 0}
        next={fetchKnownFollowersNextPage}
        hasMore={hasKnownFollowersNextPage}
        loader={<LoadingSpinner />}
        scrollThreshold={0.8}
        className="no-scrollbar flex flex-col"
      >
        {knownFollowers &&
          knownFollowers.pages
            .flatMap((page) => page?.followers)
            .map((profile, i) => (
              <Fragment key={i}>
                {profile && (
                  <ProfileCard key={profile?.handle + i} profile={profile} />
                )}
              </Fragment>
            ))}
      </InfiniteScroll>

      {isFetchingKnownFollowers && !isFetchingKnownFollowersNextPage && (
        <ProfileCardSkeleton />
      )}
      {isEmpty && (
        <div className="mx-3 md:mx-0">
          <FeedAlert
            variant="empty"
            message={`${handle} has no known followers... yet`}
            standalone
          />
        </div>
      )}
    </section>
  );
}
