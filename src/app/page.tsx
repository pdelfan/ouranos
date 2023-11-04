import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-5 min-h-[100svh] justify-center">
      <Image src="/logo.svg" alt="Ouranos logo" width={140} height={40} />
      <div className="flex gap-3">
        <Link href="https://bsky.app">Sign up on Bluesky</Link>
        <Link href="/login">Log in</Link>
      </div>
    </main>
  );
}
