interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export default function Textarea(props: Props) {
  const { className } = props;
  return (
    <textarea
      {...props}
      className={`border-skin-base focus:outline-skin-base focus:bg-skin-tertiary text-skin-base placeholder:text-skin-secondary bg-skin-secondary peer block w-full rounded-xl border p-2.5 text-sm outline outline-transparent hover:bg-skin-tertiary/80 
       ${className}`}
    />
  );
}
