import { JSONContent } from "@tiptap/react";

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
      return "What's up?";
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
