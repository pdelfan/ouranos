import { ReactElement } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement;
}

export default function Input(props: Props) {
  const { icon } = props;
  return (
    <div className="relative">
      {icon && (
        <div className="text-skin-icon-base absolute left-2 top-4 text-lg">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`${
          icon ? "mt-1 pl-8 pr-4" : "px-4"
        } border-skin-base focus:outline-skin-base focus:bg-skin-tertiary text-skin-base placeholder:text-skin-secondary bg-skin-secondary peer block w-full rounded-xl border py-2.5 text-sm outline outline-transparent hover:bg-skin-tertiary`}
      />
    </div>
  );
}
