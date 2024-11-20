import { JSONContent } from "@tiptap/react";
import { ThreadgateSetting } from "../../../types/feed";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { AppBskyFeedPost } from "@atproto/api";
import { detect } from "tinyld";

export function getHandle(mention: string) {
  return mention.slice(1);
}

export function getHostname(url: string) {
  // Check if the url is defined and is a string
  if (typeof url !== "string") {
    return "";
  }

  const matches = url.match(/\/([^\/?#]+)(?:[\/?#]|$)/i);
  // extract hostname (return name with no www)
  return matches ? matches[1] : url.replace(/^www\./, "");
}

export function getShortAddress(url: string) {
  const newURL = new URL(url);
  const text = newURL.hostname + newURL.pathname;

  if (text.endsWith("/")) {
    return text.slice(0, -1);
  }

  return text;
}

export function isInvalidHandle(handle: string): boolean {
  return handle === "handle.invalid";
}

export function getNotificationLabel(reason: string) {
  switch (reason) {
    case "like":
      return "liked your post";
    case "follow":
      return "followed you";
    case "repost":
      return "reposted your post";
    default:
      return "";
  }
}

export function getComposerPlaceholder(type: string, name?: string) {
  switch (type) {
    case "reply":
      return `Replying to ${name}`;
    case "quote":
      return `Quoting ${name}`;
    default:
      return "What's on your mind?";
  }
}

export function jsonToText(json: JSONContent) {
  const content = json.content;
  let text = "";

  content?.forEach((p, index) => {
    if (index > 0) {
      text = text + "\n";
    }

    if (p.content) {
      p.content.forEach((item) => {
        if (item.type === "hardBreak") {
          text = text + "\n";
        }

        if (item.text) {
          text = text + item.text;
        }

        if (item.type === "mention") {
          text = text + "@" + item.attrs?.id;
        }
      });
    }
  });

  return text;
}

export function detectLanguage(text: string) {
  if (text === "") return;
  const language = detect(text);

  return language;
}

// TODO: add language prefs to localStorage to use for lang
// the default is English for now
export function getTranslateLink(text: string, lang: string = "en"): string {
  return `https://translate.google.com/?sl=auto&tl=${lang}&text=${encodeURIComponent(
    text,
  )}`;
}

export const getThreadGateComposerTitle = (value: ThreadgateSetting[]) => {
  if (value.length === 0) return "Everyone can reply";
  if (value.length === 1) {
    if (value[0] === "nobody") return "No one can reply";
    if (value[0] == "following") return "Users you follow can reply";
    if (value[0] === "mention") return "Users you mention can reply";
  }

  if (value.length === 2) {
    return "Some users can reply";
  }
};

export const replyIncludes = (reply: PostView["record"], term: string) => {
  const text = AppBskyFeedPost.isRecord(reply) && reply.text;
  if (!text || !text.toLowerCase().includes(term.toLowerCase())) return false;
  return true;
};
