"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { signOut } from "next-auth/react";

interface Props {
  iconOnly?: boolean;
}

export default function SignOut(props: Props) {
  const { iconOnly } = props;

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="font-medium text-neutral-500"
    >
      {iconOnly ? (
        <Icon icon="bx:log-out" className="text-neutral-600 text-2xl" />
      ) : (
        "Sign out"
      )}
    </button>
  );
}
