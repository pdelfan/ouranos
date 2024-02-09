import { ReactElement } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement;
}

export default function Input(props: Props) {
  const { icon } = props;
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-2 top-4 text-lg text-neutral-500">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`${
          icon ? "mt-1 pl-8 pr-4" : "px-4"
        } w-full  rounded-lg border py-2.5 text-neutral-600 focus:outline-neutral-400`}
      />
    </div>
  );
}
