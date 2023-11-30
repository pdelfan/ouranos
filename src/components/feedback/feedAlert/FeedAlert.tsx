import { getFeedAlertIcon } from "@/lib/utils/icon";
import { FeedAlert } from "../../../../types/feed";

interface Props {
  variant: FeedAlert;
  message: string;
  standalone?: boolean;
}

export default function FeedAlert(props: Props) {
  const { variant, message, standalone = false } = props;
  const icon = getFeedAlertIcon(variant);
  const selectedClass = standalone
    ? "border rounded-2xl"
    : "border-b border-x-0 md:border-x md:rounded-b-2xl";

  return (
    <section
      className={`flex flex-col justify-center gap-2 p-3 ${selectedClass} text-neutral-600`}
    >
      <span className="mx-auto">{icon}</span>
      <span className="text-center font-medium">{message}</span>
    </section>
  );
}
