interface Props {
  text: string;
}

export default function ViewerInfo(props: Props) {
  const { text } = props;

  return (
    <small className="max-w-fit bg-neutral-100 text-neutral-600 font-medium py-0.5 px-1.5 rounded">
      {text}
    </small>
  );
}
