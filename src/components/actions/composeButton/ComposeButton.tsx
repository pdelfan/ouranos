"use client";

import { useComposerControls } from "@/app/providers/composer";
import { useScrollContext } from "@/app/providers/scroll";
import { usePathname } from "next/navigation";
import { RiQuillPenFill } from "react-icons/ri";

interface Props {
  mode: "float" | "fixed";
}

export default function ComposeButton(props: Props) {
  const { mode } = props;
  const val = useScrollContext();
  const canUpdate = typeof window !== "undefined";
  const pathname = usePathname();
  const userHandle =
    pathname.includes("/user/") && !pathname.includes("/post/")
      ? pathname.split("/")[3]
      : "";
  const { openComposer } = useComposerControls();

  return (
    <>
      {mode === "float" && (
        <button
          onClick={() => openComposer({ mention: userHandle })}
          className="bg-primary text-skin-inverted hover:bg-primary-dark fixed bottom-24 right-3 z-40 rounded-full p-3.5 outline-none transition-all ease-linear md:hidden"
          style={{
            opacity: canUpdate ? `${100 - (val ?? 0)}%` : "100%",
            transform: canUpdate
              ? `translateY(${val ?? 0}%)`
              : "translateY(0%)",
          }}
        >
          <RiQuillPenFill className="text-skin-icon-inverted text-2xl" />
        </button>
      )}

      {mode === "fixed" && (
        <button
          onClick={() => openComposer({ mention: userHandle })}
          className="bg-primary text-skin-inverted flex items-center gap-2 rounded-full p-3.5 font-semibold hover:brightness-95 lg:px-3 lg:py-2.5"
        >
          <RiQuillPenFill className="text-skin-icon-inverted text-2xl" />
          <span className="hidden lg:inline">Write a post</span>
        </button>
      )}
    </>
  );
}
