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
}

export default function BottomEditorBar(props: Props) {
  const { editor, charCount } = props;
  return (
    <div className="flex justify-between border-t py-3">
      <div className="flex gap-4">
        <EmojiPicker onEmojiSelect={editor.commands.insertContent} />
        <AdultContentPicker />
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
