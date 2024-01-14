interface Props {
  children: React.ReactNode;
}

export default function Tabs(props: Props) {
  const { children } = props;

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="flex flex-nowrap gap-3 overflow-x-scroll"
    >
      {children}
    </div>
  );
}
