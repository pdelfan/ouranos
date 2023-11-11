import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: string;
  iconColor?: string;
  className?: string;
}

export default function Button(props: Props) {
  const { children, icon, iconColor, color, className, ...rest } = props;

  return (
    <button
      className={`flex items-center justify-center gap-1 font-medium text-sm disabled:cursor-not-allowed ${
        className
          ? className
          : "rounded-lg p-2 bg-neutral-50 text-neutral-500 border hover:brightness-95"
      }
  ${
    props.disabled &&
    "opacity-30 contrast-75 hover:brightness-100 cursor-not-allowed"
  }`}
      {...rest}
    >
      {icon && <Icon icon={icon} className={`text-lg ${iconColor}`} />}
      {children}
    </button>
  );
}
