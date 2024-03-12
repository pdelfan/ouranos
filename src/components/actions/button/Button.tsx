import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: string;
  iconColor?: string;
  iconSize?: string;
  className?: string;
}

export default forwardRef<HTMLButtonElement, Props>(
  function Button(props, ref) {
    const { children, icon, iconColor, iconSize, color, className, ...rest } =
      props;

    return (
      <button
        ref={ref}
        className={`flex items-center justify-center gap-1 disabled:cursor-not-allowed ${
          className
            ? className
            : "text-skin-secondary border-skin-base bg-skin-secondary rounded-lg border p-2 text-sm font-medium hover:brightness-95"
        }
      ${
        props.disabled &&
        "cursor-not-allowed opacity-30 contrast-75 hover:brightness-100"
      }`}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
