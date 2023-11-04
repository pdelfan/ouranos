"use client";

import { signIn, useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      {session && (
        <div>
          <p>{session.user?.handle}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
      {!session && (
        <div>
          <p>Not logged in</p>
          <button onClick={() => signIn()}>Log in</button>
        </div>
      )}
    </div>
  );
}
