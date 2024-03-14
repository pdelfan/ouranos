import { getAlertIcon } from "@/lib/utils/icon";

interface Props {
  variant: Alert;
  message: string;
}

export default function Alert(props: Props) {
  const { variant, message } = props;
  const icon = getAlertIcon(variant);

  return (
    <div className="bg-skin-tertiary text-skin-base flex flex-wrap items-center gap-2 rounded-lg p-3 font-medium">
      {icon} {message}
    </div>
  );
}
