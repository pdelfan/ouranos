import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: string;
  iconColor?: string;
  color?: string;
  bgColor?: string;
}

export default function Button(props: Props) {
  const { children, icon, iconColor, color, bgColor, ...rest } = props;

  return (
    <button
      className={`flex items-center justify-center gap-2 p-2 border rounded-lg font-medium text-sm ${
        bgColor ? bgColor : "bg-neutral-50"
      } ${color ? color : "text-neutral-500"} ${
        props.disabled &&
        "opacity-30 contrast-75 hover:brightness-100 cursor-not-allowed"
      } hover:brightness-95 disabled:cursor-not-allowed`}
      {...rest}
    >
      {icon && <Icon icon={icon} className={`text-lg ${iconColor}`} />}
      {children}
    </button>
  );
}
