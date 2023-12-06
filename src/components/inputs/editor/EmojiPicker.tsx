import Button from "@/components/actions/button/Button";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";

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
        icon="bx:smile"
        iconColor="text-primary"
        iconSize="text-2xl"
        className="p-0"
      />
      {showEmojiPicker && (
        <div className="absolute mt-2 md:bottom-14">
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
