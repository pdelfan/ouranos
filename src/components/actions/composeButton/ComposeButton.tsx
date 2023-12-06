import useHideOnScroll from "@/lib/hooks/useHideOnScroll";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Editor from "@/components/inputs/editor/Editor";

interface Props {
  mode: "float" | "fixed";
}

export default function ComposeButton(props: Props) {
  const { mode } = props;
  const [showEditor, setShowEditor] = useState(false);
  const show = useHideOnScroll();

  return (
    <Dialog.Root open={showEditor} onOpenChange={setShowEditor}>
      {mode === "float" && (
        <Dialog.Trigger asChild>
          <button
            className={`z-50 p-3.5 rounded-full fixed md:hidden right-3 bottom-20 md:bottom-5 bg-primary text-white shadow-lg hover:bg-primary-dark outline-none ${
              show ? "translate-y-0" : "translate-y-36"
            } transition-translate ease-in-out duration-300`}
          >
            <Icon icon="mdi:feather" className="text-2xl" />
            <span className="hidden lg:inline">Write a post</span>
          </button>
        </Dialog.Trigger>
      )}

      {mode === "fixed" && (
        <Dialog.Trigger asChild>
          <button className="p-3 flex items-center gap-2 bg-primary lg:px-3 lg:py-2 rounded-full text-white font-semibold hover:brightness-95">
            <Icon icon="mdi:feather" className="text-2xl" />
            <span className="hidden lg:inline">Write a post</span>
          </button>
        </Dialog.Trigger>
      )}

      <Dialog.Portal>
        <Dialog.Content>
          <Editor onCancel={() => setShowEditor(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
