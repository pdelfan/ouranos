"use client";

import Link from "next/link";
import Navbar from "../navbar/Navbar";
import Image from "next/image";
import ComposeButton from "@/components/actions/composeButton/ComposeButton";
import Button from "@/components/actions/button/Button";

export default function SidePanel() {
  return (
    <menu className="hidden md:inline-flex items-center lg:items-start flex-col sticky top-6 h-full max-h-[91svh] overflow-y-hidden hover:overflow-y-auto">
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline mb-12"
      >
        <Image
          src="/ouranos.svg"
          alt="Ouranos logo"
          width={44}
          height={44}
          priority
          className="block transition-transform ease-in-out duration-700 hover:rotate-180"
        />
      </Button>
      <Navbar />
      <div className="mt-28">
        <ComposeButton mode="fixed" />
      </div>
    </menu>
  );
}
