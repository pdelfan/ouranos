import { Icon } from "@iconify/react/dist/iconify.js";
import { FeedAlert } from "../../../types/feed";

export function getAlertIcon(variant: Alert) {
  switch (variant) {
    case "success":
      return <Icon icon="ep:success-filled" className="text-2xl" />;
    case "error":
      return <Icon icon="fluent:shield-error-24-filled" className="text-2xl" />;
    case "info":
      return <Icon icon="ep:warning-filled" className="text-2xl" />;
    case "warning":
      return <Icon icon="ep:warning-filled" className="text-2xl" />;
    default:
      return <Icon icon="ep:warning-filled" className="text-2xl" />;
  }
}

export function getFeedAlertIcon(variant: FeedAlert) {
  switch (variant) {
    case "empty":
      return <Icon icon="ep:warning-filled" className="text-2xl" />;
    case "doesNotExist":
      return <Icon icon="ep:warning-filled" className="text-2xl" />;
    case "misconfigured":
      return <Icon icon="fluent:shield-error-24-filled" className="text-2xl" />;
    case "badResponse":
      return <Icon icon="ooui:error" className="text-2xl" />;
    case "offline":
      return <Icon icon="ion:cloud-offline" className="text-2xl" />;
    case "blocked":
      return <Icon icon="fluent:shield-error-24-filled" className="text-2xl" />;
    default:
      return <Icon icon="ep:warning-filled" className="text-2xl" />;
  }
}
