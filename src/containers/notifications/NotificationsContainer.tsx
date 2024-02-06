"use client";

import NotificationItem from "@/components/contentDisplay/notification/NotificationItem";
import NotificationSkeleton from "@/components/contentDisplay/notification/NotificationSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import useNotification from "@/lib/hooks/bsky/notification/useNotification";
import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function NotificationsContainer() {
  const {
    notificationStatus,
    notificationData,
    notificationError,
    isLoadingNotification,
    isFetchingNotification,
    fetchNotificationNextPage,
    isFetchingNotificationNextPage,
    notificationHasNextPage,
  } = useNotification();

  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;

  const dataLength = notificationData?.pages.reduce(
    (acc, page) => acc + (page?.data.notifications.length ?? 0),
    0,
  );

  const isEmpty =
    !isFetchingNotification &&
    !isFetchingNotificationNextPage &&
    dataLength === 0;

  return (
    <section>
      <InfiniteScroll
        dataLength={dataLength ?? 0}
        next={fetchNotificationNextPage}
        hasMore={notificationHasNextPage}
        loader={<LoadingSpinner />}
        className="no-scrollbar flex flex-col"
      >
        {notificationData &&
          contentFilter &&
          notificationData.pages
            .flatMap((page) => page?.data.notifications)
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
        <FeedAlert
          variant="badResponse"
          message="Something went wrong"
          standalone
        />
      )}
      {isEmpty && !notificationHasNextPage && (
        <FeedAlert
          variant="empty"
          message="There are no notifications to show... yet"
          standalone
        />
      )}
      {!isEmpty &&
        !notificationError &&
        !isFetchingNotification &&
        !notificationHasNextPage &&
        !isFetchingNotificationNextPage && <EndOfFeed />}
    </section>
  );
}
