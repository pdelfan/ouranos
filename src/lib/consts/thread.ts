import { ThreadgateSetting } from "../../../types/feed";

export const MAX_REPLIES = 4;

export const MAX_PARENT_REPLIES = 8;

export const MAX_REPLY_CONTAINERS = 50;

export const THREADGATE_OPTIONS: { label: string; value: ThreadgateSetting }[] =
  [
    { label: "No One", value: "nobody" },
    { label: "Mentioned Users", value: "mention" },
    { label: "Users You Follow", value: "following" },
  ];
