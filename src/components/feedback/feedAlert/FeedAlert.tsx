import { getFeedAlertIcon } from "@/lib/utils/icon";
import { FeedAlert } from "../../../../types/feed";

interface Props {
  variant: FeedAlert;
  message: string;
}

export default function FeedAlert(props: Props) {
  const { variant, message } = props;
  const icon = getFeedAlertIcon(variant);

  return (
    <section className="flex flex-col justify-center gap-2 p-3 border-b sm:border-x sm:rounded-b-2xl text-neutral-600">
      <span className="mx-auto">{icon}</span>
      <span className="text-center font-medium">{message}</span>
    </section>
  );
}
