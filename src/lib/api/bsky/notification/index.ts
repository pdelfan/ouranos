import { type Agent } from "@atproto/api";

export const getNotifications = async (agent: Agent, cursor: string) => {
  const notifications = await agent.listNotifications({
    cursor: cursor,
    limit: 22,
  });
  if (!notifications.success) throw new Error("Could not get notifications");
  return notifications;
};

export const updateSeenNotifications = async (agent: Agent) => {
  return await agent.updateSeenNotifications();
};

export const getUnreadNotificationsCount = async (agent: Agent) => {
  const count = await agent.countUnreadNotifications();
  if (!count.success)
    throw new Error("Could not get unread notifications count");  
  return count.data.count;
};
