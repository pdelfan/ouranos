interface Props {
  className?: string;
}

export default function Threadline(props: Props) {
  const { className } = props;
  return (
    <div className={`absolute left-6 top-0 z-10 h-full border ${className}`} />
  );
}
