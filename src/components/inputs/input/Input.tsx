import { ReactElement } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement;
}

export default function Input(props: Props) {
  const { icon } = props;
  return (
    <div className="relative">
      {icon && (
        <div className="text-skin-icon-base absolute left-2 top-3 text-lg">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`${
          icon ? "mt-1 pl-8 pr-4" : "px-4"
        } border-skin-base outline-offset-0 outline-2 outline-transparent focus:outline-skin-base focus:outline active:outline-2 hover:outline-skin-base/50 hover:outline  focus:bg-skin-tertiary text-skin-base placeholder:text-skin-secondary bg-skin-secondary peer block w-full rounded-xl border py-2.5 text-sm hover:bg-skin-tertiary/80
`}
      />
    </div>
  );
}
