import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: string;
  iconColor?: string;
  iconSize?: string;
  className?: string;
}

export default forwardRef<HTMLButtonElement, Props>(function Button(
  props,
  ref
) {
  const { children, icon, iconColor, iconSize, color, className, ...rest } =
    props;

  return (
    <button
      ref={ref}
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
      {icon && (
        <Icon
          icon={icon}
          className={`${iconColor} ${iconSize ? iconSize : "text-lg"}`}
        />
      )}
      {children}
    </button>
  );
});
