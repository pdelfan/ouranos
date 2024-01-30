import EmojiPicker from "./EmojiPicker";
import type { Editor, JSONContent } from "@tiptap/react";
import AdultContentPicker from "./AdultContentPicker";
import ImagePicker from "./ImagePicker";
import CharacterCount from "./CharacterCount";
import LanguagePicker from "./LanguagePicker";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiUpload } from "react-icons/bi";
import UploadPreview from "./UploadPreview";
import { RichText } from "@atproto/api";
import { jsonToText } from "@/lib/utils/text";
import ThreadGatePicker from "./ThreadGatePicker";
import { ThreadgateSetting } from "../../../../types/feed";

interface Props {
  editor: Editor;
  text: JSONContent;
  label: string;
  languages: Language[];
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
      },
    });

  return (
    <section>
      <div className="flex flex-wrap justify-between gap-5 border-t py-3">
        <div className="flex gap-4">
          <EmojiPicker onEmojiSelect={editor.commands.insertContent} />
          <AdultContentPicker
            onSelectLabel={onSelectLabel}
            selectedLabel={label}
            disabled={!images || images.length === 0}
          />
          <ThreadGatePicker
            onUpdate={onUpdateThreadGate}
            selected={threadGate}
          />
          <ImagePicker onShow={setShowDropzone} />
          {/* <LinkPicker editor={editor} /> */}
        </div>
        <div className="just flex flex-wrap gap-x-5 gap-y-2">
          <LanguagePicker
            languages={languages}
            onSelectLanguages={onSelectLanguages}
          />
          <CharacterCount charCount={charCount} />
        </div>
      </div>
      {images && images.length > 0 && (
        <UploadPreview images={images.slice(0, 4)} onUpdate={onUpdateImages} />
      )}
      {showDropzone && (
        <div
          {...getRootProps()}
          className={`
            animate-fade animate-duration-200 cursor-pointer rounded-2xl border p-6 text-center hover:bg-neutral-50
            ${
              isDragActive &&
              "ring-primary border-neutral-200 bg-neutral-50 ring-2"
            }
          `}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-2 text-sm font-medium">
            <BiUpload className="text-2xl text-neutral-600" />
            <>
              {!isDragReject && (
                <span className="text-neutral-600">
                  Drag and drop your images or click to select images <br /> You
                  can upload up to 4 images
                </span>
              )}
              {isDragReject && (
                <span className="text-neutral-600">
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
