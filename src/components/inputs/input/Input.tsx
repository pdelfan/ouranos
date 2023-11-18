interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="px-4 py-2.5 mt-1  w-full rounded-lg text-gray-600 border focus:outline-gray-400"
    />
  );
}
