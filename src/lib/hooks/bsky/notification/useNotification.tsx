import { useInView } from "react-intersection-observer";
import useAgent from "../useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  getNotifications,
  updateSeenNotifications,
} from "@/lib/api/bsky/notification";
import { GroupedNotification } from "../../../../../types/feed";
import { Notification } from "@atproto/api/dist/client/types/app/bsky/notification/listNotifications";

export default function useNotification() {
  const agent = useAgent();
  const { ref, inView } = useInView({ rootMargin: "100px" });

  const groupNotifications = (
    notifications: Notification[]
  ): GroupedNotification[] => {
    const result: GroupedNotification[] = [];

    for (const notif of notifications) {
      const prior = result.find(
        (n) =>
          n.reason === notif.reason && n.reasonSubject === notif.reasonSubject
      );

      if (prior) {
        prior.allAuthors && prior.allAuthors.push(notif.author);
      } else {
        result.push({
          ...notif,
          allAuthors: [notif.author],
        });
      }
    }

    return result;
  };

  const {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: async ({ pageParam }) => {
      const res = await getNotifications(agent, pageParam);
      await updateSeenNotifications(agent);
      res.data.notifications = groupNotifications(res.data.notifications);
      return res;
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.data.cursor,
    refetchInterval: 20000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return {
    observerRef: ref,
    notificationStatus: status,
    notificationData: data,
    notificationError: error,
    isLoadingNotification: isLoading,
    isFetchingNotification: isFetching,
    isFetchingNotificationNextPage: isFetchingNextPage,
    notificationHasNextPage: hasNextPage,
  };
}
