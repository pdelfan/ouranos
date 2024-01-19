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
  const debouncedRefetch = useDebouncedCallback(onRefetch, 300);

  return (
    <Button
      onClick={debouncedRefetch}
      className="z-40 p-3 rounded-full fixed bottom-24 md:bottom-8 ml-3 md:ml-[0.80rem] border border-neutral-300 bg-white hover:bg-neutral-50 hover:-rotate-180 ease-linear transition-all"
      style={{
        opacity: val ? `${100 - (val ?? 0)}%` : "100%",
        transform: val ? `translateY(${val ?? 0}%)` : "100%",
      }}
    >
      <LuRefreshCcw className="text-2xl text-neutral-500 hover:text-neutral-600" />
    </Button>
  );
}
