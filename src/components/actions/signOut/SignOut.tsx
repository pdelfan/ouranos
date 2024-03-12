"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-skin-tertiary hover:text-skin-base font-medium"
    >
      Sign out
    </button>
  );
}
