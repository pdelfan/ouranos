"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Input from "@/components/inputs/input/Input";
import Label from "@/components/inputs/label/Label";
import { useRouter } from "next/navigation";
import Button from "@/components/actions/button/Button";
import Image from "next/image";
import { PiSignInBold } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import LoadingSpinner from "@/components/status/loadingSpinner/LoadingSpinner";

export default function LoginForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user.bskySession && !formSubmitted) {
      setIsRedirecting(true);
      const id = setTimeout(() => {
        router.push("/dashboard/home");
      }, 1000);

      return () => clearTimeout(id);
    }
  }, [router, session?.user.bskySession, formSubmitted]);

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
      setFormSubmitted(true);
      router.push("/dashboard/home");
    }
  };

  if (isRedirecting) {
    return (
      <section className="bg-skin-base border border-skin-base shadow-2xl shadow-primary-light/30 max-w-xs rounded-2xl p-5">
        <Image
          src="/logo.svg"
          alt="Ouranos logo"
          width={150}
          height={50}
          priority
          className="mx-auto mb-3"
        />
        <h1 className="text-skin-base mb-1 text-center text-xl font-semibold">
          Welcome Back
        </h1>

        <p className="text-skin-secondary mb-3 text-center text-sm font-medium">
          Already logged in, redirecting...
        </p>
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section className="bg-skin-base border border-skin-base max-w-xs rounded-2xl p-5 shadow-2xl shadow-primary-light/30">
      <Image
        src="/logo.svg"
        alt="Ouranos logo"
        width={150}
        height={50}
        className="mx-auto mb-3"
      />
      <h1 className="text-skin-base mb-1 text-xl font-semibold">Welcome</h1>
      <p className="text-skin-secondary mb-3 text-sm font-medium">
        We recommend using an{" "}
        <Link
          href="https://bsky.app/settings/app-passwords"
          target="_blank"
          className="text-skin-link-base hover:text-skin-link-hover"
        >
          app password
        </Link>{" "}
        to log in.
      </p>
      <form
        className="mt-5 text-sm font-medium"
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
            icon={<MdAlternateEmail />}
            placeholder="handle.bsky.social"
            value={handle}
            onChange={(e) => {
              setError("");
              setHandle(e.target.value);
            }}
          />
        </span>
        <span className="mt-3 block">
          <Label htmlFor="password">Password</Label>
          <Input
            required
            type="password"
            name="password"
            icon={<BiSolidLockAlt />}
            placeholder="password"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />
        </span>
        {error && (
          <small className="text-status-danger mt-1 block font-medium">
            {error}
          </small>
        )}
        <Button
          type="submit"
          className={`text-skin-inverted bg-skin-inverted hover:bg-skin-inverted ml-auto mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-3 font-semibold disabled:cursor-not-allowed ${
            loading && "animate-pulse animate-duration-1000"
          }`}
          disabled={loading}
          aria-disabled={loading}
        >
          <PiSignInBold className="text-lg" />
          {loading && "Logging in..."}
          {!loading && "Log in"}
        </Button>
      </form>
    </section>
  );
}
