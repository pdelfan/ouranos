"use client";

import Navbar from "../navbar/Navbar";
import Image from "next/image";
import Button from "@/components/actions/button/Button";

export default function SidePanel() {
  return (
    <menu className="hidden md:inline-flex items-center lg:items-start flex-col sticky top-6 h-full max-h-[91svh] overflow-y-hidden hover:overflow-y-auto">
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline mb-8"
      >
        <div className="flex items-center gap-3 group">
          <Image
            src="/ouranos.svg"
            alt="Ouranos logo"
            width={44}
            height={44}
            priority
            className="block transition-transform ease-in-out duration-700 group-hover:rotate-180"
          />
          <Image
            src="/ouranosText.svg"
            alt="Ouranos text"
            width={84}
            height={26}
            priority
            className="hidden lg:block"
          />
        </div>
      </Button>
      <Navbar />
    </menu>
  );
}
