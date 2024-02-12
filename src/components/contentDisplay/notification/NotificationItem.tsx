import { getNotificationLabel } from "@/lib/utils/text";
import { getRelativeTime } from "@/lib/utils/time";
import { getNotificationIcon } from "@/lib/utils/icon";
import {
  GROUPABLE_NOTIFICATIONS,
  MAX_AUTHORS_SHOWN,
} from "@/lib/consts/notification";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import Link from "next/link";
import {
  ContentFilterResult,
  GroupedNotification,
} from "../../../../types/feed";
import NotificationPost from "./NotificationPost";
import NotificationContnet from "./NotificationContent";
import { AppBskyNotificationListNotifications } from "@atproto/api";
import { memo } from "react";

interface Props {
  notification: GroupedNotification;
  filter: ContentFilterResult;
}

const NotificationItem = memo(function NotificationItem(props: Props) {
  const { notification, filter } = props;
  const { reason, author, indexedAt, isRead, allAuthors } = notification;
  const subjectUri =
    notification.reasonSubject as AppBskyNotificationListNotifications.Notification["reasonSubject"];

  if (GROUPABLE_NOTIFICATIONS.includes(reason)) {
    return (
      <article
        className={`flex flex-col justify-between border border-x-0 p-3 first:border-t last:border-b md:border-x  odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0 ${
          !isRead && "bg-neutral-100"
        }`}
      >
        <div className="flex gap-2">
          {getNotificationIcon(reason)}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              {allAuthors && allAuthors.length > 0 && (
                <>
                  {allAuthors.slice(0, MAX_AUTHORS_SHOWN).map((author) => (
                    <Link
                      key={author.handle}
                      href={`/dashboard/user/${author.handle}`}
                      className="max-w-fit hover:brightness-90"
                    >
                      <Avatar src={author.avatar} />
                    </Link>
                  ))}
                  {allAuthors.length > MAX_AUTHORS_SHOWN && (
                    <span className="font-medium text-neutral-600">
                      +{allAuthors.length - MAX_AUTHORS_SHOWN}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              <div>
                {allAuthors && allAuthors.length > 1 && (
                  <>
                    <Link
                      key={author.handle}
                      href={`/dashboard/user/${author.handle}`}
                      className="break-all font-semibold text-neutral-700 hover:text-neutral-500"
                    >
                      {author.displayName || author.handle}{" "}
                    </Link>
                    <span className="text-neutral-700">
                      and {allAuthors.length - 1}{" "}
                      {allAuthors.length - 1 > 1 ? "others" : "other"}{" "}
                    </span>
                  </>
                )}
                {allAuthors?.length === 1 && (
                  <Link
                    href={`/dashboard/user/${author.handle}`}
                    className="break-all font-semibold text-neutral-700 hover:text-neutral-500"
                  >
                    {author.displayName || author.handle}{" "}
                  </Link>
                )}
                <span className="break-words font-medium text-neutral-700">
                  {getNotificationLabel(reason)}
                </span>
                <span className="whitespace-nowrap font-medium text-neutral-400">
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
      <div
        className={`flex flex-col justify-between border border-x-0 p-3 first:border-t last:border-b md:border-x odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0 ${
          !isRead && "bg-neutral-100"
        }`}
      >
        <NotificationPost uri={notification.uri} filter={filter} />
      </div>
    );
  }
});

export default NotificationItem;
