import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getNotifications,
  updateSeenNotifications,
} from "@/lib/api/bsky/notification";
import { GroupedNotification } from "../../../../../types/feed";
import { Notification } from "@atproto/api/dist/client/types/app/bsky/notification/listNotifications";
import { useAgent } from "@/app/providers/agent";

interface Props {
  notificationType: NotificationReason | "all";
}

export default function useNotification(props: Props) {
  const { notificationType } = props;
  const agent = useAgent();
  const groupNotifications = (
    notifications: Notification[],
  ): GroupedNotification[] => {
    const result: GroupedNotification[] = [];

    for (const notif of notifications) {
      const prior = result.find(
        (n) =>
          n.reason === notif.reason && n.reasonSubject === notif.reasonSubject,
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
    queryKey: ["notifications", notificationType],
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

  return {
    notificationStatus: status,
    notificationData: data,
    notificationError: error,
    isLoadingNotification: isLoading,
    isFetchingNotification: isFetching,
    fetchNotificationNextPage: fetchNextPage,
    isFetchingNotificationNextPage: isFetchingNextPage,
    notificationHasNextPage: hasNextPage,
  };
}
