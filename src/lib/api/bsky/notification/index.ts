import { type AtpAgent } from "@atproto/api";

export const getNotifications = async (agent: AtpAgent, cursor: string) => {
  const notifications = await agent.listNotifications({
    cursor: cursor,
    limit: 22,
  });
  if (!notifications.success) throw new Error("Could not get notifications");
  return notifications;
};

export const updateSeenNotifications = async (agent: AtpAgent) => {
  return await agent.updateSeenNotifications();
};

export const getUnreadNotificationsCount = async (agent: AtpAgent) => {
  const count = await agent.countUnreadNotifications();
  if (!count.success)
    throw new Error("Could not get unread notifications count");  
  return count.data.count;
};
