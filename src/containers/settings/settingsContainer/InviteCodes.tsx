"use client";

import { InviteCode } from "@atproto/api/dist/client/types/com/atproto/server/defs";
import Link from "next/link";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidCopy } from "react-icons/bi";
import { FaTicket } from "react-icons/fa6";
import { PiWarningCircleFill } from "react-icons/pi";
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
    [clipboard],
  );

  return (
    <>
      <button
        disabled={codes.length === 0}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`mt-2 flex w-full items-center gap-2 rounded-none border border-x-0 p-3 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:contrast-75 disabled:hover:brightness-100 md:rounded-2xl md:border-x ${
          isOpen ? "border-b-0 md:rounded-b-none" : "md:rounded-2xl"
        }`}
      >
        <FaTicket className="text-xl text-neutral-600" />
        {unusedCodes.length} available
      </button>

      {isOpen && (
        <div className="flex flex-col">
          {unusedCodes.map((code) => (
            <button
              key={code.code}
              onClick={() => handleCopy(code.code)}
              className="flex items-center gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
            >
              <BiSolidCopy className="shrink-0 text-xl text-neutral-600" />
              <span>{code.code}</span>
            </button>
          ))}
          <div className="flex items-center gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
            <PiWarningCircleFill className="shrink-0 text-xl text-neutral-600" />
            <p>
              Note: You can now
              <Link
                href="https://bsky.social/about/blog/02-06-2024-join-bluesky"
                className="text-primary hover:text-primary-dark"
              >
                {" "}
                join Bluesky without an invite code!{" "}
              </Link>
              For now, this section is kept as a memento.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
