"use client"

import { Icon } from "@iconify/react/dist/iconify.js";
import { useComposerContext } from "@/app/providers/composer";
import { useScrollContext } from "@/app/providers/scroll";

interface Props {
  mode: "float" | "fixed";
}

export default function ComposeButton(props: Props) {
  const { mode } = props;
  const show = useScrollContext();
  const { isOpen, options, openComposer, closeComposer } = useComposerContext();

  const toggleComposer = () => {
    if (isOpen) closeComposer();
    else openComposer({});
  };

  return (
    <>
      {mode === "float" && (
        <button
          onClick={toggleComposer}
          className={`z-40 p-3.5 rounded-full fixed md:hidden right-3 bottom-28 bg-primary text-white hover:bg-primary-dark outline-none ${
            show ? "translate-y-0 opacity-100" : "translate-y-36 opacity-0"
          } transition-all ease-in-out duration-500`}
        >
          <Icon icon="mdi:feather" className="text-2xl" />
        </button>
      )}

      {mode === "fixed" && (
        <button
          onClick={toggleComposer}
          className="p-3.5 flex items-center gap-2 bg-primary lg:px-3 lg:py-2.5 rounded-full text-white font-semibold hover:brightness-95"
        >
          <Icon icon="mdi:feather" className="text-2xl" />
          <span className="hidden lg:inline">Write a post</span>
        </button>
      )}
    </>
  );
}
