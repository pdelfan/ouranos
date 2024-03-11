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
          className="text-skin-secondary hover:text-skin-base font-medium"
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

        <h1 className="text-skin-base max-w-lg text-4xl font-medium">
          Your friendly Bluesky client for the web
        </h1>

        <ul className="text-skin-secondary mt-5 text-lg font-medium">
          <li>Designed for simplicity</li>
          <li>Enhanced features</li>
          <li>Open-source</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="https://bsky.app"
            className="text-skin-base bg-skin-muted/70 hover:bg-skin-muted rounded-full px-5 py-3 font-medium"
          >
            Sign up on Bluesky
          </Link>
          <Link
            href="/login"
            className="text-skin-inverted bg-skin-inverted hover:bg-skin-inverted-muted rounded-full px-5 py-3 font-medium"
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
      <footer className="animate-fade-up animate-delay-500 text-skin-tertiary mt-16 text-center text-sm font-medium">
        OURANOS · EARLY ACCESS · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
