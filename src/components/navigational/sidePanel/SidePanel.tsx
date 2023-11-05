"use client";

import Link from "next/link";
import Navbar from "../navbar/Navbar";
import Image from "next/image";
import Compose from "@/components/actions/compose/Compose";

export default function SidePanel() {
  return (
    <menu className="inline-flex flex-col">
      <Link href="/dashboard" className="inline-block mb-12">
        <Image src="/logo.svg" alt="Ouranos logo" width={150} height={44} />
      </Link>
      <Navbar />
      <div className="mt-28">
        <Compose />
      </div>
    </menu>
  );
}
