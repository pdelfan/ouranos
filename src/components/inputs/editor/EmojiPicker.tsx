import Button from "@/components/actions/button/Button";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { BiSmile } from "react-icons/bi";

interface Props {
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiPicker(props: Props) {
  const { onEmojiSelect } = props;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setShowEmojiPicker(!showEmojiPicker);
        }}
        className="p-0"
      >
        <BiSmile className="text-primary hover:text-primary-dark text-2xl" />{" "}
      </Button>
      {showEmojiPicker && (
        <div className="border-skin-base animate-fade animate-duration-200 absolute z-50 mt-2 max-h-72 overflow-y-scroll rounded-2xl border shadow-md md:bottom-14">
          <Picker
            data={data}
            onEmojiSelect={(emoji: EmojiData, e: React.MouseEvent) => {
              e.stopPropagation();
              onEmojiSelect(emoji.native);
              setShowEmojiPicker(false);
            }}
            onClickOutside={() => {
              setShowEmojiPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
