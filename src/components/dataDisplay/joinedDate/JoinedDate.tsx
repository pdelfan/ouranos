import { BiCalendar } from "react-icons/bi";

interface Props {
  date: Date;
}

export default function JoinedDate(props: Props) {
  const { date } = props;

  return (
    <div className="flex items-center gap-1">
      <BiCalendar className="text-skin-tertiary" />
      <span className="text-skin-tertiary font-medium">
        Joined {""}
        {date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}
      </span>
    </div>
  );
}
