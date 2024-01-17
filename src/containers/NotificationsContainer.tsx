"use client";

import NotificationItem from "@/components/contentDisplay/notification/NotificationItem";
import NotificationSkeleton from "@/components/contentDisplay/notification/NotificationSkeleton";
import EndOfFeed from "@/components/feedback/endOfFeed/EndOfFeed";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import useNotification from "@/lib/hooks/bsky/notification/useNotification";
import useInfiniteList from "@/lib/hooks/useInfiniteList";
import useVirtualList from "@/lib/hooks/useVirtualList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function NotificationsContainer() {
  const {
    notificationStatus,
    notificationData,
    notificationError,
    isLoadingNotification,
    isFetchingNotification,
    isFetchingNotificationNextPage,
    notificationHasNextPage,
    fetchNextPageNotification,
  } = useNotification();

  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;

  const allNotifications = notificationData
    ? notificationData?.pages.flatMap((page) => page?.data.notifications)
    : [];

  const { virtualizer, viewportRef, virtualMap, getVirtualItems } =
    useVirtualList({
      items: allNotifications,
      options: {
        size: 500,
        overscan: 2,
        scrollMargin: 200,
        hasNextPage: notificationHasNextPage,
      },
    });

  useInfiniteList({
    items: allNotifications,
    fetchNextPage: fetchNextPageNotification,
    getVirtualItems: getVirtualItems,
    hasNextPage: notificationHasNextPage,
    isFetchingNextPage: isFetchingNotification,
  });

  const isEmpty =
    !isFetchingNotification &&
    !isFetchingNotificationNextPage &&
    notificationData?.pages[0]?.data?.notifications.length === 0;

  return (
    <div>
      <section
        ref={viewportRef}
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        <section className="flex flex-col">
          {contentFilter &&
            virtualMap((item) => (
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
                className="flex flex-col justify-between p-3 border border-x-0 md:border-x first:border-t last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 md:first:rounded-t-2xl"
              >
                {allNotifications[item.index] && (
                  <NotificationItem
                    key={allNotifications[item.index]?.uri}
                    notification={allNotifications[item.index]}
                    filter={contentFilter}
                  />
                )}

                {item.index > allNotifications.length - 1 && (
                  <section className="flex flex-1 justify-center">
                    <AiOutlineLoading3Quarters className="text-xl" />
                  </section>
                )}
              </article>
            ))}
        </section>
      </section>
      {isFetchingNotification && !isFetchingNotificationNextPage && (
        <NotificationSkeleton />
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
    </div>
  );
}
