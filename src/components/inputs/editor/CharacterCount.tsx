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
        <span className="text-status-danger w-8 font-medium">
          {300 - charCount}
        </span>
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
          percentage <= 100 ? "stroke-primary" : "stroke-status-danger"
        }`}
      />
    </div>
  );
}
