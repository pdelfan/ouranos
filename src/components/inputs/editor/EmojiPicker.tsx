import Button from "@/components/actions/button/Button";
import { useState } from "react";
import { BiSmile } from "react-icons/bi";
import dynamic from "next/dynamic";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false },
);

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
        <div className="animate-fade animate-duration-200 absolute z-50 mt-2  shadow-md rounded-lg md:bottom-14">
          <Picker
            width={330}
            height={300}
            skinTonesDisabled={true}
            lazyLoadEmojis={true}
            previewConfig={{ showPreview: false }}
            onEmojiClick={(emojiData, e: MouseEvent) => {
              e.stopPropagation();
              onEmojiSelect(emojiData.emoji);
              setShowEmojiPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
