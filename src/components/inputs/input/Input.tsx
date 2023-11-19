import { Icon } from "@iconify/react/dist/iconify.js";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

export default function Input(props: Props) {
  const { icon } = props;
  return (
    <div className="relative">
      {icon && (
        <Icon
          icon={icon}
          className="absolute top-4 left-2 text-lg text-neutral-500"
        />
      )}
      <input
        {...props}
        className={`${
          icon ? "pr-4 pl-8" : "px-4"
        } py-2.5 mt-1  w-full rounded-lg text-gray-600 border focus:outline-gray-400`}
      />
    </div>
  );
}
