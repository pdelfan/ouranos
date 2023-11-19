"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/inputs/input/Input";
import Label from "@/components/inputs/label/Label";
import { useRouter } from "next/navigation";
import Button from "@/components/actions/button/Button";

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
      router.push("/dashboard/home");
    }
  };
  return (
    <section className="bg-neutral-100/80  rounded-2xl max-w-xs p-5">
      <h1 className="text-xl font-semibold text-gray-800 mb-1">Welcome Back</h1>
      <h2 className="text-sm font-medium text-gray-500">
        We recommend using an app password to log in{" "}
        <Link
          href="https://atproto.com/community/projects#app-passwords"
          target="_blank"
          className="text-primary hover:brightness-95"
        >
          (learn more)
        </Link>
        .
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
            icon="ic:baseline-alternate-email"
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
            icon="bxs:lock-alt"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />
        </span>
        {error && (
          <small className="block text-red-500 font-medium mt-1">{error}</small>
        )}
        <Button
          type="submit"
          className="flex items-center gap-2 justify-center font-semibold px-3 py-3 mt-5 ml-auto w-full rounded-lg bg-zinc-600 text-white disabled:cursor-not-allowed hover:brightness-95"
          disabled={loading}
          aria-disabled={loading}
          icon="mdi:sign-in"
        >
          {loading && "Logging in..."}
          {!loading && "Log in"}
        </Button>
      </form>
    </section>
  );
}
