import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }

  export interface User {
    id: string;
    handle: string;
    email: string;
    emailConfirmed: boolean;
  }
}
