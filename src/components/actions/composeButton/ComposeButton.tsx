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
          className="z-40 p-3.5 rounded-full fixed md:hidden right-3 bottom-24 bg-primary text-white hover:bg-primary-dark outline-none ease-linear transition-all"
          style={{
            opacity: val ? `${100 - (val ?? 0)}%` : "100%",
            transform: val ? `translateY(${val ?? 0}%)` : "100%",
          }}
        >
          <RiQuillPenFill className="text-2xl" />
        </button>
      )}

      {mode === "fixed" && (
        <button
          onClick={() => openComposer({ mention: userHandle })}
          className="p-3.5 flex items-center gap-2 bg-primary lg:px-3 lg:py-2.5 rounded-full text-white font-semibold hover:brightness-95"
        >
          <RiQuillPenFill className="text-2xl" />
          <span className="hidden lg:inline">Write a post</span>
        </button>
      )}
    </>
  );
}
