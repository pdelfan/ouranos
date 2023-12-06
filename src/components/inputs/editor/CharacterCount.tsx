import { CircularProgressbar } from "react-circular-progressbar";

interface Props {
  charCount: number;
}

export default function CharacterCount(props: Props) {
  const { charCount } = props;
  const percentage = (100 * charCount) / 300;

  return (
    <div className="flex gap-2.5">
      {percentage > 100 && (
        <span className="w-8 font-medium text-red-500">{300 - charCount}</span>
      )}
      <CircularProgressbar
        strokeWidth={14}
        value={percentage}
        styles={{
          trail: {
            stroke: "#eee",
          },
        }}
        className={`w-6 ${
          percentage <= 100 ? "stroke-primary" : "stroke-red-500"
        }`}
      />
    </div>
  );
}
