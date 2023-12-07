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
  languages: Language[];
  onSelectLabel: React.Dispatch<React.SetStateAction<string>>;
  onSelectLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
}

export default function BottomEditorBar(props: Props) {
  const {
    editor,
    charCount,
    label,
    languages,
    onSelectLabel,
    onSelectLanguages,
  } = props;

  return (
    <div className="flex flex-wrap justify-between gap-5 border-t py-3">
      <div className="flex gap-4">
        <EmojiPicker onEmojiSelect={editor.commands.insertContent} />
        <AdultContentPicker
          onSelectLabel={onSelectLabel}
          selectedLabel={label}
        />
        <ImagePicker />
        <LinkPicker editor={editor} />
      </div>
      <div className="flex flex-wrap just gap-x-5 gap-y-2">
        <LanguagePicker
          languages={languages}
          onSelectLanguages={onSelectLanguages}
        />
        <CharacterCount charCount={charCount} />
      </div>
    </div>
  );
}
