interface Props {
  text: string;
}

export default function ViewerInfo(props: Props) {
  const { text } = props;

  return (
    <small className="text-skin-base bg-skin-tertiary max-w-fit rounded px-1.5 py-0.5 font-medium">
      {text}
    </small>
  );
}
