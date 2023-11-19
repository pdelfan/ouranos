import { ContentFilter } from "../../../types/feed";

export const contentFilterOptions: ContentFilter[] = [
  {
    type: "nsfw",
    label: "Explicit Sexual Images",
    visiblity: "warn",
    adult: true,
    message: "This post contains explicit sexual images",
  },
  {
    type: "nudity",
    label: "Other Nudity",
    visiblity: "warn",
    adult: true,
    message: "This post contains nudity",
  },
  {
    type: "suggestive",
    label: "Sexually Suggestive",
    visiblity: "show",
    adult: true,
    message: "This post contains sexually suggestive content",
  },
  {
    type: "gore",
    label: "Violent / Bloody",
    visiblity: "hide",
    adult: true,
    message: "This post contains violent or bloody content",
  },
  {
    type: "hate",
    label: "Political Hate-Groups",
    visiblity: "warn",
    adult: false,
    message: "This post has political hate content",
  },
  {
    type: "spam",
    label: "Spam",
    visiblity: "hide",
    adult: false,
    message: "This post has been flagged as spam",
  },
  {
    type: "impersonation",
    label: "Impersonation",
    visiblity: "warn",
    adult: false,
    message: "This post has been flagged as impersonation",
  },
];
