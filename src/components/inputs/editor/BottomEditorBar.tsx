import EmojiPicker from "./EmojiPicker";
import type { Editor } from "@tiptap/react";
import AdultContentPicker from "./AdultContentPicker";
import ImagePicker from "./ImagePicker";
import LinkPicker from "./LinkPicker";
import CharacterCount from "./CharacterCount";
import LanguagePicker from "./LanguagePicker";

interface Props {
  editor: Editor;
  charCount: number;
  label: string;
  onSelectLabel: React.Dispatch<React.SetStateAction<string>>;
}

export default function BottomEditorBar(props: Props) {
  const { editor, charCount, label, onSelectLabel } = props;
  return (
    <div className="flex flex-wrap justify-between gap-5 border-t py-3">
      <div className="flex gap-4">
        <EmojiPicker onEmojiSelect={editor.commands.insertContent} />
        <AdultContentPicker
          onSelectLabel={onSelectLabel}
          selectedLabel={label}
        />
        <ImagePicker />
        <LinkPicker />
      </div>
      <div className="flex gap-5">
        <LanguagePicker />
        <CharacterCount charCount={charCount} />
      </div>
    </div>
  );
}
