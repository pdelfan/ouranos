interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  return <section className="mt-2 md:mt-0">{children}</section>;
}
