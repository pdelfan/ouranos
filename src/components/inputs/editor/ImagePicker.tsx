import Button from "@/components/actions/button/Button";
import { BiImage } from "react-icons/bi";

interface Props {
  onShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImagePicker(props: Props) {
  const { onShow } = props;

  return (
    <div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onShow((prev) => !prev);
        }}
        className="p-0"
      >
        <BiImage className="text-primary hover:text-primary-dark text-2xl" />
      </Button>
    </div>
  );
}
