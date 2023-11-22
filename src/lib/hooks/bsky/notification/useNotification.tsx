import { useInView } from "react-intersection-observer";
import useAgent from "../useAgent";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  getNotifications,
  updateSeenNotifications,
} from "@/lib/api/bsky/notification";

export default function useNotification() {
  const agent = useAgent();
  const { ref, inView } = useInView();
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
      return res;
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.data.cursor,
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
