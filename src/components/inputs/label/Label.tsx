interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export default function Label(props: Props) {
  const { children } = props;
  return (
    <label
      {...props}
      className="text-md font-medium text-gray-600 dark:text-white"
    >
      {children}
    </label>
  );
}
