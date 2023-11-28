import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto p-5 mt-0 md:mt-24">
      <header className="flex justify-between items-center max-w-xl mx-auto">
        <Image src="/logo.svg" alt="Ouranos logo" width={120} height={35} />
        <Link href="/about" className="font-medium text-neutral-500">
          About
        </Link>
      </header>
      <section className="mt-16 max-w-xl mx-auto">
        <h1 className="text-4xl font-medium text-neutral-600 max-w-lg">
          Your friendly Bluesky client for the web
        </h1>

        <ul className="mt-5 text-lg font-medium text-neutral-500">
          <li>Designed for simplicity</li>
          <li>Enhanced features</li>
          <li>Open-source</li>
        </ul>

        <div className="flex gap-3 mt-6">
          <Link
            href="https://bsky.app"
            className="bg-neutral-200/70 text-neutral-600 font-medium px-5 py-3 rounded-full hover:brightness-95"
          >
            Sign up on Bluesky
          </Link>
          <Link
            href="/login"
            className="bg-zinc-600 text-white font-medium px-5 py-3 rounded-full hover:brightness-95"
          >
            Log in
          </Link>
        </div>
      </section>
      <div className="mx-auto max-w-fit mt-12">
        <Image
          src="/images/screenshot.png"
          alt="Ouranos desktop screenshot"
          width={1200}
          height={763}
        />
      </div>
    </main>
  );
}
