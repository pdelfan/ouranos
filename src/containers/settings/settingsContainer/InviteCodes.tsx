"use client";

import { InviteCode } from "@atproto/api/dist/client/types/com/atproto/server/defs";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidCopy } from "react-icons/bi";
import { FaTicket } from "react-icons/fa6";
import { useClipboard } from "use-clipboard-copy";

interface Props {
  codes: InviteCode[];
}

export default function InviteCodes(props: Props) {
  const { codes } = props;
  const unusedCodes = codes.filter((code) => code.uses.length === 0);
  const [isOpen, setIsOpen] = useState(false);
  const clipboard = useClipboard({ copiedTimeout: 3500 });

  const handleCopy = useCallback(
    (code: string) => {
      clipboard.copy(code);
      toast.success("Code copied to clipboard");
    },
    [clipboard]
  );

  return (
    <>
      <button
        disabled={codes.length === 0}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 p-3 mt-2 w-full border border-x-0 md:border-x rounded-none md:rounded-2xl hover:bg-neutral-50 disabled:opacity-30 disabled:contrast-75 disabled:hover:brightness-100 disabled:cursor-not-allowed ${
          isOpen ? "border-b-0 md:rounded-b-none" : "md:rounded-2xl"
        }`}
      >
        <FaTicket className="text-neutral-600 text-xl" />
        {unusedCodes.length} available
      </button>

      {isOpen && (
        <div className="flex flex-col">
          {unusedCodes.map((code) => (
            <button
              key={code.code}
              onClick={() => handleCopy(code.code)}
              className="flex items-center gap-2 p-3 border border-x-0 md:border-x md:last:rounded-b-2xl last:border-b even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0 hover:bg-neutral-50"
            >
              <BiSolidCopy className="text-neutral-600 text-xl" />
              <span>{code.code}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
