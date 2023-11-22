export function getPostId(uri: string): string {
  if (!uri) return "";

  const s = uri.split("/");
  const [, , , , id] = s; // skip the first four slashes

  return id;
}
