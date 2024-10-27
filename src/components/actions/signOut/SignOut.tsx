"use client";

import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-skin-tertiary hover:text-skin-base font-medium"
    >
      <BiLogOut className="text-2xl text-skin-secondary hover:text-skin-base" />
    </button>
  );
}
