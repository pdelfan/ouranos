import type { Notification } from "@atproto/api/dist/client/types/app/bsky/notification/listNotifications";
import { getNotificationLabel } from "@/lib/utils/text";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getRelativeTime } from "@/lib/utils/time";
import { GROUPABLE_NOTIFICATIONS } from "@/lib/consts/notification";
import Link from "next/link";
import { ContentFilterResult } from "../../../../types/feed";
import NotificationPost from "./NotificationPost";
import NotificationContnet from "./NotificationContent";
import { AppBskyNotificationListNotifications } from "@atproto/api";

interface Props {
  notification: Notification;
  filter: ContentFilterResult;
}

export default function NotificationItem(props: Props) {
  const { notification, filter } = props;
  const { reason, author, indexedAt } = notification;
  const subjectUri =
    notification.reasonSubject as AppBskyNotificationListNotifications.Notification["reasonSubject"];

  const getNotificationIcon = (reason: string) => {
    switch (reason) {
      case "like":
        return <Icon icon="bxs:heart" className="text-2xl text-red-500 shrink-0" />;
      case "repost":
        return <Icon icon="bx:repost" className="text-2xl text-green-600 shrink-0" />;
      case "follow":
        return <Icon icon="bxs:user-plus" className="text-2xl text-primary shrink-0" />;
      default:
        return null;
    }
  };

  if (GROUPABLE_NOTIFICATIONS.includes(reason)) {
    return (
      <article className="flex flex-col justify-between p-3 border border-x-0 sm:border-x first:border-t last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 sm:first:rounded-t-2xl">
        <div className="flex gap-2">
          {getNotificationIcon(reason)}
          <div className="flex flex-col gap-2">
            <Link
              href={`/dashboard/user/${author.handle}`}
              className="max-w-fit hover:brightness-90"
            >
              <Avatar profile={notification.author} />
            </Link>
            <div className="flex flex-wrap gap-1">
              <div>
                <Link
                  href={`/dashboard/user/${author.handle}`}
                  className="font-semibold break-all hover:text-neutral-600"
                >
                  {author.displayName ?? author.handle}{" "}
                </Link>
                <span className="text-neutral-500 font-medium break-words">
                  {getNotificationLabel(reason)}
                </span>
                <span className="text-neutral-400 font-medium whitespace-nowrap">
                  &nbsp;· {getRelativeTime(indexedAt)}
                </span>
                {subjectUri && (
                  <NotificationContnet uri={subjectUri} filter={filter} />
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  } else {
    return (
      <div className="flex flex-col justify-between p-3 border border-x-0 sm:border-x first:border-t last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 first:sm:rounded-t-2xl hover:bg-neutral-50">
        <NotificationPost uri={notification.uri} filter={filter} />
      </div>
    );
  }
}
