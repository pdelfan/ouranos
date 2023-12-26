"use client";

import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";

interface Props {
  iconOnly?: boolean;
}

export default function SignOut(props: Props) {
  const { iconOnly } = props;

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="font-medium text-neutral-500 hover:text-neutral-400"
    >
      {iconOnly ? (
        <BiLogOut className="text-2xl text-neutral-600" />
      ) : (
        "Sign out"
      )}
    </button>
  );
}
