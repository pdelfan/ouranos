interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export default function Label(props: Props) {
  const { children, ...rest } = props;
  return (
    <label {...rest} className="text-md font-medium text-neutral-600">
      {children}
    </label>
  );
}
