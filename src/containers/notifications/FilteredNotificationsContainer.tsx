"use client";

import NotificationItem from "@/components/contentDisplay/notification/NotificationItem";
import NotificationSkeleton from "@/components/contentDisplay/notification/NotificationSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import useNotification from "@/lib/hooks/bsky/notification/useNotification";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  filter: NotificationReason | "all";
}

export default function FilteredNotificationsContainer(props: Props) {
  const { filter } = props;
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const {
    notificationStatus,
    notificationData,
    notificationError,
    isLoadingNotification,
    isFetchingNotification,
    fetchNotificationNextPage,
    isFetchingNotificationNextPage,
    notificationHasNextPage,
  } = useNotification({ notificationType: filter });

  // load next page if there are no filtered notifications on the current page
  useEffect(() => {
    if (
      notificationData &&
      notificationData.pages
        .flatMap((page) => page?.data.notifications)
        .filter((item) => (filter === "all" ? true : item.reason === filter))
        .length < 10 &&
      notificationHasNextPage
    ) {
      fetchNotificationNextPage();
      setIsFetchingMore(true);
    } else {
      setIsFetchingMore(false);
    }
  }, [
    fetchNotificationNextPage,
    filter,
    notificationData,
    notificationHasNextPage,
  ]);

  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;

  const dataLength = notificationData?.pages.reduce(
    (acc, page) => acc + (page?.data.notifications.length ?? 0),
    0,
  );

  const isEmpty =
    !isFetchingNotification &&
    !isFetchingNotificationNextPage &&
    notificationData &&
    notificationData.pages
      .flatMap((page) => page?.data.notifications)
      .filter((item) => (filter === "all" ? true : item.reason === filter))
      .length === 0;

  return (
    <section>
      <InfiniteScroll
        dataLength={dataLength ?? 0}
        next={fetchNotificationNextPage}
        hasMore={notificationHasNextPage}
        loader={!isFetchingMore && <LoadingSpinner />}
        scrollThreshold={0.8}
        className="no-scrollbar flex flex-col"
      >
        {notificationData &&
          contentFilter &&
          notificationData.pages
            .flatMap((page) => page?.data.notifications)
            .filter((item) =>
              filter === "all" ? true : item.reason === filter,
            )
            .map((notification, i) => (
              <Fragment key={i}>
                {notification && (
                  <NotificationItem
                    key={notification.uri + i}
                    notification={notification}
                    filter={contentFilter}
                  />
                )}
              </Fragment>
            ))}
      </InfiniteScroll>

      {isFetchingNotification && !isFetchingNotificationNextPage && (
        <NotificationSkeleton />
      )}
      {notificationError && (
        <div className="border-skin-base border-t">
          <FeedAlert variant="badResponse" message="Something went wrong" />
        </div>
      )}
      {isFetchingMore && <LoadingSpinner />}
      {isEmpty && !notificationHasNextPage && !isFetchingMore && (
        <div className="border-skin-base border-t">
          <FeedAlert
            variant="empty"
            message="There are no notifications to show... yet"
          />
        </div>
      )}
      {!isEmpty &&
        !notificationError &&
        !isFetchingNotification &&
        !notificationHasNextPage &&
        !isFetchingNotificationNextPage && <EndOfFeed />}
    </section>
  );
}
