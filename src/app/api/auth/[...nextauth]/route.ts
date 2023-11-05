import { JWT } from "next-auth/jwt";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { agent } from "@/lib/api/bsky";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "bluesky",
      name: "Bluesky",
      credentials: {
        handle: {
          label: "Handle",
          type: "text",
          placeholder: "handle.bsky.social",
        },
        password: { label: "App Password", type: "password" },
      },

      // authorize user
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const result = await agent.login({
          identifier: credentials.handle,
          password: credentials.password,
        });

        if (result.success && agent.session) {
          const user = {
            id: agent.session.did,
            handle: agent.session.handle,
            email: agent.session.email!,
            emailConfirmed: agent.session.emailConfirmed ?? false,
          };
          return user;
        } else {
          // an error will be displayed advising the user to check their details.
          return null;

          // (Optional) can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.handle = user.handle;
        token.email = user.email;
        token.emailConfirmed = user.emailConfirmed;
      }
      return token;
    },
    // add extra properties to session
    async session({ session, token }): Promise<Session> {
      const typedToken = token as JWT & User;
      session.user.id = typedToken.id;
      session.user.handle = typedToken.handle;
      session.user.email = typedToken.email;
      session.user.emailConfirmed = typedToken.emailConfirmed;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
