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
