interface Props {
  className?: string;
}

export default function Threadline(props: Props) {
  const { className } = props;
  return (
    <div
      className={`border-skin-base absolute left-6 top-6 z-10 h-full border ${className}`}
    />
  );
}
