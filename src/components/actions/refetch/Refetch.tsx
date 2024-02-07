"use client";

import { useScrollContext } from "@/app/providers/scroll";
import Button from "../button/Button";
import { useDebouncedCallback } from "use-debounce";
import { LuRefreshCcw } from "react-icons/lu";

interface Props {
  onRefetch: () => void;
}

export default function Refetch(props: Props) {
  const { onRefetch } = props;
  const val = useScrollContext();
  const canUpdate = typeof window !== "undefined";
  const debouncedRefetch = useDebouncedCallback(onRefetch, 300);

  return (
    <Button
      onClick={debouncedRefetch}
      className="fixed bottom-24 z-40 ml-3 rounded-full border border-neutral-300 bg-white p-3 transition-all ease-linear hover:-rotate-180 hover:bg-neutral-50 md:bottom-8 md:ml-[0.80rem]"
      style={{
        opacity: canUpdate ? `${100 - (val ?? 0)}%` : "100%",
        transform: canUpdate ? `translateY(${val ?? 0}%)` : "translateY(0%)",
      }}
    >
      <LuRefreshCcw className="text-2xl text-neutral-500 hover:text-neutral-600" />
    </Button>
  );
}
