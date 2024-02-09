import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto mt-0 p-5 md:mt-16">
      <header className="mx-auto flex max-w-xl items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/ouranos.svg"
            alt="Ouranos logo"
            width={40}
            height={40}
            className="block transition-transform duration-700 ease-in-out hover:rotate-180"
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
      <section className="animate-fade-up animate-delay-150 mx-auto mt-16 max-w-xl">
        <small className="bg-primary/10 text-primary animate-fade-up animate-delay-[1000ms] mb-1 inline-flex items-center gap-1 rounded-full px-3 py-2 text-[0.6rem] font-bold">
          In Early Access
          <Image
            src="/images/confetti.png"
            alt="Confetti emoji"
            width={14}
            height={14}
          />
        </small>

        <h1 className="max-w-lg text-4xl font-medium text-neutral-600">
          Your friendly Bluesky client for the web
        </h1>

        <ul className="mt-5 text-lg font-medium text-neutral-500">
          <li>Designed for simplicity</li>
          <li>Enhanced features</li>
          <li>Open-source</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="https://bsky.app"
            className="rounded-full bg-neutral-200/70 px-5 py-3 font-medium text-neutral-600 hover:bg-neutral-300/60"
          >
            Sign up on Bluesky
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-neutral-600 px-5 py-3 font-medium text-white hover:bg-neutral-700"
          >
            Log in
          </Link>
        </div>
      </section>
      <div className="animate-fade-up animate-delay-300 mx-auto mt-8 max-w-fit">
        <Image
          src="/images/screenshot.png"
          alt="Ouranos desktop screenshot"
          width={1000}
          height={830}
          priority
        />
      </div>
      <footer className="animate-fade-up animate-delay-500 mt-16 text-center text-sm font-medium text-neutral-400">
        OURANOS · EARLY ACCESS · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
