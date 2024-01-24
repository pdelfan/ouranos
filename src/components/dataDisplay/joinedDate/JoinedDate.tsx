import { BiCalendar } from "react-icons/bi";

interface Props {
  date: Date;
}

export default function JoinedDate(props: Props) {
  const { date } = props;

  return (
    <div className="flex items-center gap-1">
      <BiCalendar className="text-neutral-400" />
      <span className="font-medium text-neutral-400 text-sm">
        Joined {""}
        {date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}
      </span>
    </div>
  );
}
