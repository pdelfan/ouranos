import { CircularProgressbar } from "react-circular-progressbar";

interface Props {
  charCount: number;
}

export default function CharacterCount(props: Props) {
  const { charCount } = props;

  return (
    <div className="flex gap-2.5 ml-auto">
      <span
        className={`font-medium ${
          charCount <= 300 ? "text-neutral-600" : "text-red-500"
        }`}
      >
        {300 - charCount}
      </span>
      <CircularProgressbar
        strokeWidth={14}
        value={(100 * charCount) / 300}
        styles={{
          trail: {
            stroke: "#eee",
          },
        }}
        className={`w-6 ${
          charCount <= 300 ? "stroke-primary" : "stroke-red-500"
        }`}
      />
    </div>
  );
}
