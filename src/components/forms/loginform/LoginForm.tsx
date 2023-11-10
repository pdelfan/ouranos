"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/inputs/input/Input";
import Label from "@/components/inputs/label/Label";
import { useRouter } from "next/navigation";

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
      redirect: false,
      callbackUrl: "/dashboard/home",
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }

    if (result?.ok) {
      router.push("/dashboard");
    }
  };
  return (
    <section className="bg-white border rounded-2xl max-w-xs p-5 dark:bg-neutral-700 dark:border-neutral-600">
      <h1 className="text-xl font-semibold text-gray-800 mb-1 mt-3 dark:text-neutral-100">
        Welcome Back
      </h1>
      <h2 className="text-sm font-medium text-gray-500 dark:text-neutral-400">
        We recommend using an app password to log in.{" "}
        <Link
          href="https://atproto.com/community/projects#app-passwords"
          target="_blank"
          className="text-primary hover:brightness-95"
        >
          Learn more
        </Link>
      </h2>
      <form
        className="text-sm font-medium text-gray-400 mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <span>
          <Label htmlFor="handle">Handle</Label>
          <Input
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
          <Label htmlFor="password">Password</Label>
          <Input
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
          className="flex items-center gap-2 justify-center font-semibold px-3 py-3 mt-5 w-full rounded-full bg-primary text-white disabled:cursor-not-allowed hover:brightness-95"
          disabled={loading}
          aria-disabled={loading}
        >
          {loading && "Logging in..."}
          {!loading && "Log in"}
        </button>
      </form>
    </section>
  );
}
