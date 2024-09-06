"use client";

import Button from "@/components/actions/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex h-[100svh] flex-col items-center justify-center p-3">
      <div className="flex items-center gap-3">
        <Image src="/ouranos.svg" alt="Ouranos logo" width={40} height={40} />
        <Image
          src="/ouranosText.svg"
          alt="Ouranos text"
          width={70}
          height={20}
        />
      </div>
      <h1 className="mt-2 text-center text-lg sm:text-xl">
        The page you are looking for could not be found
      </h1>
      <div className="mt-6 flex justify-center">
        <Button onClick={() => router.push("/dashboard/home")}>Go Home</Button>
      </div>
    </main>
  );
}
