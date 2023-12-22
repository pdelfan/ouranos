import { type BskyAgent } from "@atproto/api";

export const getNotifications = async (agent: BskyAgent, cursor: string) => {
  const notifications = await agent.listNotifications({
    cursor: cursor,
    limit: 22,
  });
  if (!notifications.success) throw new Error("Could not get notifications");
  return notifications;
};

export const updateSeenNotifications = async (agent: BskyAgent) => {
  return await agent.updateSeenNotifications();
};

export const getUnreadNotificationsCount = async (agent: BskyAgent) => {
  const count = await agent.countUnreadNotifications();
  if (!count.success)
    throw new Error("Could not get unread notifications count");  
  return count.data.count;
};
