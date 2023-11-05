import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-5 min-h-[100svh] justify-center">
      <Image src="/logo.svg" alt="Ouranos logo" width={140} height={40} />
      <div className="flex gap-3">
        <Link
          href="https://bsky.app"
          className="bg-zinc-600 text-white font-medium px-5 py-3 rounded-full hover:brightness-95"
        >
          Sign up on Bluesky
        </Link>
        <Link
          href="/login"
          className="bg-neutral-100 text-neutral-600 font-medium px-5 py-3 rounded-full hover:brightness-95"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}
