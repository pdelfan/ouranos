import { ReactElement } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactElement;
}

export default function Input(props: Props) {
  const { icon } = props;
  return (
    <div className="relative">
      {icon && (
        <div className="absolute top-4 left-2 text-lg text-neutral-500">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`${
          icon ? "pr-4 pl-8 mt-1" : "px-4"
        } py-2.5  w-full rounded-lg text-gray-600 border focus:outline-gray-400`}
      />
    </div>
  );
}
