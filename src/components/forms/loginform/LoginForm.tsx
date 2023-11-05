"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setLoading(true);

    const result = await signIn("bluesky", {
      handle: handle,
      password: password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    // if (error) {
    //   setError(error.message);
    //   setLoading(false);
    // } else {
    //   router.push("/dashboard/packs");
    // }
  };
  return (
    <section className="bg-white border rounded-2xl max-w-xs p-5 dark:bg-neutral-700 dark:border-neutral-600">
      <Link
        href="/"
        className="flex h-10 w-10 items-center justify-center font-medium text-lg bg-button p-2 rounded-full hover:bg-button-hover"
      >
        {"<-"}
      </Link>
      <h1 className="text-xl font-semibold text-gray-800 mb-1 mt-3 dark:text-neutral-100">
        Welcome Back
      </h1>
      <h2 className="text-sm font-medium text-gray-500 dark:text-neutral-400">
        You will need to generate an app password
      </h2>
      <form
        className="text-sm font-medium text-gray-400 mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <span>
          <label htmlFor="handle">Handle</label>
          <input
            required
            type="text"
            name="handle"
            placeholder="handle.bsky.social"
            value={handle}
            onChange={(e) => {
              setError("");
              setHandle(e.target.value);
            }}
          />
        </span>
        <span className="block mt-3">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />
        </span>
        {error && (
          <small className="block text-red-500 font-medium mt-1 animate-fade dark:text-red-400">
            {error}
          </small>
        )}
        <button
          type="submit"
          className="flex items-center gap-2 justify-center font-semibold rounded-lg px-3 py-3 mt-5 w-full disabled:cursor-not-allowed"
          disabled={loading}
          aria-disabled={loading}
        >
          {loading && (
            // <Image
            //   src={LoadingIcon}
            //   alt="Loading icon"
            //   className="animate-spin"
            //   width={20}
            //   height={20}
            // />
            <p>Loading...</p>
          )}
          {loading && "Logging in..."}
          {!loading && "Log in"}
        </button>
      </form>
    </section>
  );
}
