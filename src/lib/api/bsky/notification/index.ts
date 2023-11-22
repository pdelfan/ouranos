import { type BskyAgent } from "@atproto/api";

export const getNotifications = async (agent: BskyAgent, cursor: string) => {
  const notifications = await agent.listNotifications({
    cursor: cursor,
    limit: 20,
  });
  if (!notifications.success) throw new Error("Could not get notifications");
  return notifications;
};

export const updateSeenNotifications = async (agent: BskyAgent) => {
  return await agent.updateSeenNotifications();
};
