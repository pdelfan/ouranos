import { getNotificationLabel } from "@/lib/utils/text";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import { BiSolidHeart } from "react-icons/bi";
import { BiRepost } from "react-icons/bi";
import { BiSolidUserPlus } from "react-icons/bi";
import { getRelativeTime } from "@/lib/utils/time";
import { GROUPABLE_NOTIFICATIONS } from "@/lib/consts/notification";
import Link from "next/link";
import {
  ContentFilterResult,
  GroupedNotification,
} from "../../../../types/feed";
import NotificationPost from "./NotificationPost";
import NotificationContnet from "./NotificationContent";
import { AppBskyNotificationListNotifications } from "@atproto/api";

interface Props {
  notification: GroupedNotification;
  filter: ContentFilterResult;
}

export default function NotificationItem(props: Props) {
  const { notification, filter } = props;
  const { reason, author, indexedAt, isRead, allAuthors } = notification;
  const subjectUri =
    notification.reasonSubject as AppBskyNotificationListNotifications.Notification["reasonSubject"];

  const MAX_AUTHORS_SHOWN = 6;

  const getNotificationIcon = (reason: string) => {
    switch (reason) {
      case "like":
        return <BiSolidHeart className="text-2xl text-red-500 shrink-0" />;
      case "repost":
        return <BiRepost className="text-2xl text-green-600 shrink-0" />;
      case "follow":
        return <BiSolidUserPlus className="text-2xl text-primary shrink-0" />;
      default:
        return null;
    }
  };

  if (GROUPABLE_NOTIFICATIONS.includes(reason)) {
    return (
      <article
        className={`flex flex-col justify-between p-3 border border-x-0 md:border-x first:border-t last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 md:first:rounded-t-2xl ${
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
                      <Avatar profile={author} />
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
                      className="font-semibold break-all text-neutral-700 hover:text-neutral-500"
                    >
                      {author.displayName ?? author.handle}{" "}
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
                    className="font-semibold break-all text-neutral-700 hover:text-neutral-500"
                  >
                    {author.displayName ?? author.handle}{" "}
                  </Link>
                )}
                <span className="text-neutral-700 font-medium break-words">
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
      <div
        className={`flex flex-col justify-between p-3 border border-x-0 md:border-x first:border-t last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 first:md:rounded-t-2xl ${
          !isRead && "bg-neutral-100"
        }`}
      >
        <NotificationPost uri={notification.uri} filter={filter} />
      </div>
    );
  }
}
