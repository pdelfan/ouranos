import { getFeedAlertIcon } from "@/lib/utils/icon";
import type { FeedAlert } from "../../../../types/feed";

interface Props {
  variant: FeedAlert;
  message: string;
  standalone?: boolean;
}

export default function FeedAlert(props: Props) {
  const { variant, message, standalone = false } = props;
  const icon = getFeedAlertIcon(variant);
  const selectedClass = standalone
    ? "border border-skin-base rounded-2xl"
    : "border-b border-b-skin-base border-x-0 md:border-x md:border-x-skin-base md:rounded-b-2xl";

  return (
    <section
      className={`flex flex-col justify-center gap-2 p-3 ${selectedClass} text-skin-base`}
    >
      <span className="mx-auto">{icon}</span>
      <span className="break-words text-center font-medium">{message}</span>
    </section>
  );
}
