import EmojiPicker from "./EmojiPicker";
import type { Editor, JSONContent } from "@tiptap/react";
import AdultContentPicker from "./AdultContentPicker";
import ImagePicker from "./ImagePicker";
import CharacterCount from "./CharacterCount";
import LanguagePicker from "./LanguagePicker";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiUpload } from "react-icons/bi";
import { RichText } from "@atproto/api";
import { jsonToText } from "@/lib/utils/text";
import ThreadGatePicker from "./ThreadGatePicker";
import { ThreadgateSetting } from "../../../../types/feed";
import LinkPicker from "./LinkPicker";
import TagPicker from "./TagPicker";

interface Props {
  editor: Editor;
  text: JSONContent;
  label: string;
  languages: Language[];
  tags: string[];
  onUpdateTags: React.Dispatch<React.SetStateAction<string[]>>;
  images?: UploadImage[];
  onUpdateImages: React.Dispatch<
    React.SetStateAction<UploadImage[] | undefined>
  >;
  threadGate: ThreadgateSetting[];
  onUpdateThreadGate: React.Dispatch<React.SetStateAction<ThreadgateSetting[]>>;
  onSelectLabel: React.Dispatch<React.SetStateAction<string>>;
  onSelectLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
}

export default function BottomEditorBar(props: Props) {
  const {
    editor,
    text,
    label,
    tags,
    onUpdateTags,
    languages,
    images,
    threadGate,
    onUpdateImages,
    onUpdateThreadGate,
    onSelectLabel,
    onSelectLanguages,
  } = props;

  const [showDropzone, setShowDropzone] = useState(false);
  const richText = new RichText({ text: jsonToText(text) });
  const charCount = richText.graphemeLength;

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: true,
      accept: {
        "image/*": [".jpeg", ".png"],
      },
      onDrop: (files) => {
        const updatedImages = [
          ...(images ?? []),
          // Bluesky's limit is 4 images
          ...files.slice(0, 4).map((file) =>
            Object.assign(file, {
              url: URL.createObjectURL(file),
            }),
          ),
        ];
        onUpdateImages(updatedImages);
        setShowDropzone(false);
      },
    });

  return (
    <section>
      <div className="mb-2">
        <ThreadGatePicker onUpdate={onUpdateThreadGate} selected={threadGate} />
      </div>
      <div className="border-skin-base border-t">
        <div className="flex flex-wrap justify-between gap-5 mt-3">
          <div className="flex gap-3">
            <EmojiPicker onEmojiSelect={editor.commands.insertContent} />
            <ImagePicker onShow={setShowDropzone} />
            <TagPicker tags={tags} onUpdateTags={onUpdateTags} />
            <AdultContentPicker
              onSelectLabel={onSelectLabel}
              selectedLabel={label}
              disabled={!images || images.length === 0}
            />
            <LinkPicker editor={editor} />
          </div>
          <div className="just flex flex-wrap gap-x-5 gap-y-2">
            <LanguagePicker
              languages={languages}
              onSelectLanguages={onSelectLanguages}
            />
            <CharacterCount charCount={charCount} />
          </div>
        </div>
      </div>
      {showDropzone && (
        <div
          {...getRootProps()}
          className={`
            animate-fade animate-duration-200 border-skin-base hover:bg-skin-secondary cursor-pointer rounded-2xl border mt-2 p-6 text-center
            ${
              isDragActive &&
              "ring-primary border-skin-base bg-skin-secondary ring-2"
            }
          `}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-2 text-sm font-medium">
            <BiUpload className="text-skin-base text-2xl" />
            <>
              {!isDragReject && (
                <span className="text-skin-base">
                  Drag and drop your images or click to select images <br /> You
                  can upload up to 4 images
                </span>
              )}
              {isDragReject && (
                <span className="text-skin-base">
                  You cannot upload this file type
                </span>
              )}
            </>
          </div>
        </div>
      )}
    </section>
  );
}
