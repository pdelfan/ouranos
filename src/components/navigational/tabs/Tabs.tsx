interface Props {
  children: React.ReactNode;
}

export default function Tabs(props: Props) {
  const { children } = props;

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="flex flex-nowrap gap-3 px-3"
    >
      {children}
    </div>
  );
}
