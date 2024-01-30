import { ThreadgateSetting } from "../../../types/feed";

export const MAX_REPLIES = 4;

export const THREADGATE_OPTIONS: { label: string; value: ThreadgateSetting }[] =
  [
    { label: "No One", value: "nobody" },
    { label: "Mentioned Users", value: "mention" },
    { label: "Users You Follow", value: "following" },
  ];
