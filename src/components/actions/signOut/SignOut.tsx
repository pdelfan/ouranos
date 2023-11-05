"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="font-medium text-neutral-500"
    >
      Sign out
    </button>
  );
}
