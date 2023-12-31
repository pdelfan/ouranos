import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto p-5 mt-0 md:mt-16">
      <header className="flex justify-between items-center max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <Image
            src="/ouranos.svg"
            alt="Ouranos logo"
            width={40}
            height={40}
            className="block transition-transform ease-in-out duration-700 hover:rotate-180"
          />
          <Image
            src="/ouranosText.svg"
            alt="Ouranos text"
            width={70}
            height={20}
          />
        </div>
        <Link
          href="/about"
          className="font-medium text-neutral-500 hover:text-neutral-600"
        >
          About
        </Link>
      </header>
      <section className="mt-16 max-w-xl mx-auto animate-fade-up animate-delay-150">
        <small className="inline-flex gap-1 items-center px-3 py-2 mb-1 rounded-full bg-primary/10 font-bold text-[0.6rem] text-primary animate-fade-up animate-delay-[1000ms]">
          In Early Access
          <Image
            src="/images/confetti.png"
            alt="Confetti emoji"
            width={14}
            height={14}
          />
        </small>

        <h1 className="text-4xl font-medium text-neutral-600 max-w-lg">
          Your friendly Bluesky client for the web
        </h1>

        <ul className="mt-5 text-lg font-medium text-neutral-500">
          <li>Designed for simplicity</li>
          <li>Enhanced features</li>
          <li>Open-source</li>
        </ul>

        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="https://bsky.app"
            className="bg-neutral-200/70 text-neutral-600 font-medium px-5 py-3 rounded-full hover:bg-neutral-300/60"
          >
            Sign up on Bluesky
          </Link>
          <Link
            href="/login"
            className="bg-zinc-600 text-white font-medium px-5 py-3 rounded-full hover:bg-zinc-700"
          >
            Log in
          </Link>
        </div>
      </section>
      <div className="mx-auto max-w-fit mt-8 animate-fade-up animate-delay-300">
        <Image
          src="/images/screenshot.png"
          alt="Ouranos desktop screenshot"
          width={1000}
          height={830}
          priority
        />
      </div>
      <footer className="mt-16 text-center text-sm font-medium text-neutral-400 animate-fade-up animate-delay-500">
        OURANOS · EARLY ACCESS · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
