import { useState } from "react";
import { BiHash } from "react-icons/bi";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/input/Input";
import Label from "../label/Label";
import PostTag from "@/components/dataDisplay/postTag/PostTag";
import { RichText } from "@atproto/api";

interface Props {
  tags: string[];
  onUpdateTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TagPicker(props: Props) {
  const { tags, onUpdateTags } = props;
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [tag, setTag] = useState("");
  const [newTags, setNewTags] = useState<string[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  const onClose = () => {
    setShowTagPicker(false);
    setNewTags([]);
    setShowWarning(false);
  };
  const onAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    const rt = new RichText({ text: trimmedTag });

    if (trimmedTag.length > 640 || rt.graphemeLength > 64) {
      setShowWarning(true);
      return;
    }

    if (trimmedTag === "" || tags.length + newTags.length >= 8) return;
    setNewTags((prev) => [...prev, trimmedTag]);
    setTag("");
  };

  const onRemoveTag = (indexToRemove: number) => {
    setNewTags((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const onSaveTags = () => {
    if (tags.length + newTags.length === 0) return; // Ensure there are tags to save
    if (tags.length + newTags.length <= 8) {
      onUpdateTags((prev) => [...prev, ...newTags]);
    }
    setNewTags([]);
    setShowWarning(false);
  };

  return (
    <Dialog.Root open={showTagPicker} onOpenChange={setShowTagPicker}>
      <Dialog.Trigger>
        <Button className="p-0">
          <BiHash className="text-2xl text-primary hover:text-primary-dark" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content>
          <section className="max-h-screen overflow-auto animate-fade-up animate-duration-200 bg-skin-base border-skin-base fixed bottom-0 z-50 flex h-fit w-full flex-col justify-between rounded-t-3xl p-3 pb-16 shadow-2xl border-t">
            <h2 className="text-skin-base mb-2 text-center text-xl font-semibold">
              Add tags
            </h2>
            <div className="flex  flex-col gap-1 md:max-w-2xl w-full md:mx-auto">
              <Label htmlFor="tags">
                Press enter to add a tag (limit is 8 tags)
              </Label>
              <Input
                type="text"
                placeholder="Your tag"
                name="tags"
                maxLength={64}
                onChange={(e) => {
                  setTag(e.currentTarget.value);
                }}
                value={tag}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onAddTag(e.currentTarget.value);
                  }
                }}
                onInput={() => setShowWarning(false)}
              />
              {showWarning && (
                <small className="text-status-danger block font-medium">
                  This tag is too long. Pick a shorter tag
                </small>
              )}

              {newTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1 mb-4">
                  {newTags.map((t, i) => (
                    <PostTag key={i} tag={t} onRemove={() => onRemoveTag(i)} />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-2 gap-2 md:max-w-2xl w-full justify-end mr-auto flex items-center md:mx-auto">
              <Button
                onClick={() => onClose()}
                className="hover:bg-skin-secondary border-skin-base text-skin-base rounded-full border px-4 py-2 text-sm font-semibold"
              >
                Cancel
              </Button>
              <Button
                disabled={newTags.length === 0}
                onClick={() => {
                  onSaveTags();
                  setShowTagPicker(false);
                }}
                className="bg-primary hover:bg-primary-dark text-white rounded-full px-4 py-2 text-sm font-semibold"
              >
                Save
              </Button>
            </div>
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
