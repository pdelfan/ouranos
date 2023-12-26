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
        <BiSmile className="text-2xl text-primary hover:text-primary-dark" />{" "}
      </Button>
      {showEmojiPicker && (
        <div className="z-50 absolute mt-2 md:bottom-14 max-h-72 overflow-y-scroll border rounded-2xl shadow-md animate-fade animate-duration-200">
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
