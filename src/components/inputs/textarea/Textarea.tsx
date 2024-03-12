interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export default function Textarea(props: Props) {
  const { className } = props;
  return (
    <textarea
      {...props}
      className={`text-skin-base focus:outline-skin-base placeholder:text-skin-secondary bg-skin-base border-skin-base w-full rounded-lg border p-2.5 ${className}`}
    />
  );
}
