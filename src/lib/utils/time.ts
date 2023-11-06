const intervals = [
  { label: "y", seconds: 31536000 },
  { label: "mo", seconds: 2592000 },
  { label: "d", seconds: 86400 },
  { label: "h", seconds: 3600 },
  { label: "m", seconds: 60 },
  { label: "s", seconds: 1 },
];

export function getRelativeTime(dates: string) {
  const date = new Date(dates);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds < seconds);
  if (!interval) return;
  const count = Math.floor(seconds / interval.seconds);
  return `${count}${interval.label}`;
}
