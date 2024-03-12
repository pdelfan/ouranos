interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export default function Label(props: Props) {
  const { children, ...rest } = props;
  return (
    <label {...rest} className="text-md text-skin-secondary font-medium">
      {children}
    </label>
  );
}
