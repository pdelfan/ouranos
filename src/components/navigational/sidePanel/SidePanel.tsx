"use client";

import Link from "next/link";
import Navbar from "../navbar/Navbar";
import Image from "next/image";
import ComposeButton from "@/components/actions/composeButton/ComposeButton";

export default function SidePanel() {
  return (
    <menu className="hidden md:inline-flex items-center lg:items-start flex-col sticky  top-6 h-full">
      <Link href="/dashboard/home" className="inline mb-12">
        <Image
          src="/ouranos.svg"
          alt="Ouranos logo"
          width={44}
          height={44}
          priority
          className="block transition-transform ease-in-out duration-700 hover:rotate-180"
        />
      </Link>
      <Navbar />
      <div className="mt-28">
        <ComposeButton mode="fixed" />
      </div>
    </menu>
  );
}
