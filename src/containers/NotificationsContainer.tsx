"use client";

import NotificationItem from "@/components/contentDisplay/notification/NotificationItem";
import NotificationSkeleton, {
  Skeleton,
} from "@/components/contentDisplay/notification/NotificationSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import useNotification from "@/lib/hooks/bsky/notification/useNotification";
import { Fragment } from "react";

export default function NotificationsContainer() {
  const {
    observerRef,
    notificationStatus,
    notificationData,
    notificationError,
    isLoadingNotification,
    isFetchingNotification,
    isFetchingNotificationNextPage,
    notificationHasNextPage,
  } = useNotification();

  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;

  const isEmpty =
    !isFetchingNotification &&
    !isFetchingNotificationNextPage &&
    notificationData?.pages[0]?.data?.notifications.length === 0;

  return (
    <section>
      <section className="flex flex-col">
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
      </section>

      {isFetchingNotification && !isFetchingNotificationNextPage && (
        <NotificationSkeleton />
      )}
      {isFetchingNotificationNextPage && (
        <div>
          <Skeleton />
          <Skeleton />
        </div>
      )}
      {notificationError && (
        <FeedAlert variant="badResponse" message="Something went wrong" />
      )}
      {isEmpty && !notificationHasNextPage && (
        <FeedAlert
          variant="empty"
          message="There are no notifications to show... yet"
        />
      )}
      {!notificationError &&
        !isFetchingNotification &&
        !isFetchingNotificationNextPage && <EndOfFeed />}
      <div ref={observerRef} />
    </section>
  );
}
