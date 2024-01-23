/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
        </div>{" "}
        <Link
          href="/"
          className="font-medium text-neutral-500 hover:text-neutral-600"
        >
          Home
        </Link>
      </header>
      <section className="mt-16 max-w-xl mx-auto animate-fade">
        <h1 className="mb-6 text-4xl font-medium text-neutral-600 max-w-lg">
          About
        </h1>
        <p>
          Ouranos is an open-source{" "}
          <Link
            href="https://blueskyweb.xyz/"
            className="underline underline-offset-2"
          >
            Bluesky
          </Link>{" "}
          client for the web, built using{" "}
          <Link
            href="https://nextjs.org/"
            className="underline underline-offset-2"
          >
            Next.js
          </Link>
          . Similar to the official Bluesky app, it uses the{" "}
          <Link
            href="https://blueskyweb.xyz/"
            className="underline underline-offset-2"
          >
            AT Protocol
          </Link>
          , a decentralized networking technology for social media. This is
          similar to Twitter apps such as Twitterrific or Tweetbot that used
          Twitter's API in the past.
        </p>

        <p className="mt-3">
          The app is being developed and designed by me,{" "}
          <Link
            href="https://bsky.app/profile/contrapunctus.bsky.social"
            className="underline underline-offset-2"
          >
            Pouria
          </Link>
          . I started the project to learn more about the AT Protocol and as fun
          way to practice my skills while I look for a full-time role after
          graduation.
        </p>

        <h2 className="mt-12 mb-6 text-2xl font-medium text-neutral-600">
          Frequently Asked Questions
        </h2>

        <h3 className="mb-1 text-lg font-semibold text-neutral-600">
          Is anything stored on your servers?
        </h3>
        <p>
          Nothing from Bluesky is stored, every request goes through the
          official Bluesky servers. When you log in, your session is stored
          using cookies on your web browser. Any extra feature that exists (or
          will be added) stores information{" "}
          <Link
            href="https://javascript.info/localstorage"
            className="underline underline-offset-2"
          >
            locally
          </Link>{" "}
          on your web browser.
        </p>

        <p className="mt-3">
          Note: When you visit the site,{" "}
          <Link
            href="https://vercel.com/analytics"
            className="underline underline-offset-2"
          >
            Vercel Analytics
          </Link>{" "}
          is used to gather anonymized information to help me get a general idea
          and provide better support. These include number of visitors, top
          visited pages, countries, operating systems, and web browsers. No
          cookies and nothing personal is collected that can be linked back to
          you. If you are using an ad blocker, tracking is likely disabled.
        </p>

        <h3 className="mb-1 mt-6 text-lg font-semibold text-neutral-600">
          Why do you recommend using an app password to log in?
        </h3>
        <p>
          App passwords allow you to log in and use the app, but restrict
          third-party clients (ex. Ouranos) from certain functionalities such as
          account deletion or generating additional app passwords.
        </p>

        <h3 className="mb-1 mt-6 text-lg font-semibold text-neutral-600">
          Does Ouranos have extra features?
        </h3>
        <p>
          The current goal is to implement current and future functionalities
          provided by the official app, and add more enhancements (some are
          currently implemented) without storing anything on our side.
        </p>
        <h3 className="mb-1 mt-6 text-lg font-semibold text-neutral-600">
          Is there a dark mode?
        </h3>
        <p>Not at the moment, but it will be added soon.</p>

        <h3 className="mb-1 mt-6 text-lg font-semibold text-neutral-600">
          Where can I see progress updates?
        </h3>
        <p>
          For the moment, you can see what is being worked on under{" "}
          <Link
            href="https://github.com/users/pdelfan/projects/1"
            className="underline underline-offset-2"
          >
            projects
          </Link>{" "}
          on GitHub.{" "}
        </p>

        <h3 className="mb-1 mt-6 text-lg font-semibold text-neutral-600">
          How can I provide feedback?
        </h3>
        <p>
          If you have an account on GitHub, you can go to the project's{" "}
          <Link
            href="https://github.com/pdelfan/ouranos"
            className="underline underline-offset-2"
          >
            repository
          </Link>{" "}
          and create an issue with a provided label (feature request, bug,
          question, etc). For general questions and anything that else that
          comes to your mind, there is{" "}
          <Link
            href="https://github.com/pdelfan/ouranos/discussions"
            className="underline underline-offset-2"
          >
            Discussions
          </Link>
          . If you are not on GitHub, you can also mention me on Bluesky (my
          handle is @contrapunctus.bsky.social).
        </p>

        <h3 className="mb-1 mt-6 text-lg font-semibold text-neutral-600">
          Can I support the project?
        </h3>
        <p className="mt-3">
          If you like to support the project and help keep the site up and
          running, stay tuned for more information! If you enjoy using Ouranos,
          let me know! I'd love to hear from you.
        </p>
      </section>
      <footer className="mt-16 text-center text-sm font-medium text-neutral-400">
        OURANOS · EARLY ACCESS · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
