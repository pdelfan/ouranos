interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export default function Textarea(props: Props) {
  const { className } = props;
  return (
    <textarea
      {...props}
      className={`p-2.5 w-full rounded-lg text-gray-600 border focus:outline-gray-400 ${className}`}
    />
  );
}
