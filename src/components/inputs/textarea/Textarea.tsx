interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export default function Textarea(props: Props) {
  const { className } = props;
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border p-2.5 text-neutral-600 focus:outline-neutral-400 ${className}`}
    />
  );
}
