import { getAlertIcon } from "@/lib/utils/icon";

interface Props {
  variant: Alert;
  message: string;
}

export default function Alert(props: Props) {
  const { variant, message } = props;
  const icon = getAlertIcon(variant);

  return (
    <div className="flex flex-wrap items-center gap-2 bg-neutral-100 p-3 rounded-lg font-medium text-neutral-600">
      {icon} {message}
    </div>
  );
}
