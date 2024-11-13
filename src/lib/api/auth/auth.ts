import { JWT } from "next-auth/jwt";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { createAgent } from "@/lib/api/bsky/agent";
import { getService } from "@/app/api/auth/identity/actions";

export const authOptions: NextAuthOptions = {
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

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const service = await getService(credentials.handle);
        const agent = createAgent(service);

        const result = await agent.login({
          identifier: credentials.handle,
          password: credentials.password,
        });

        if (result.success && agent.session) {
          const user = {
            id: agent.session.did,
            service: service,
            handle: agent.session.handle,
            email: agent.session.email!,
            emailConfirmed: agent.session.emailConfirmed ?? false,
            bskySession: agent.session,
          };

          return user;
        } else {
          // an error will be displayed advising the user to check their details
          return null;

          // (optional) can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user && user.bskySession) {
        token.service = user.service;
        token.id = user.id;
        token.handle = user.handle;
        token.email = user.email;
        token.emailConfirmed = user.emailConfirmed;
        token.bskySession = user.bskySession;
      }
      return token;
    },

    // add extra properties to session
    async session({ session, token }): Promise<Session> {
      const receivedToken = token as JWT & User;
      const agent = createAgent(receivedToken.service);

      session.user.service = receivedToken.service;
      session.user.email = receivedToken.email;
      session.user.id = receivedToken.id;
      session.user.handle = receivedToken.handle;
      session.user.emailConfirmed = receivedToken.emailConfirmed;
      session.user.bskySession = receivedToken.bskySession;

      const refreshToken: { iat: number; exp: number } = jwtDecode(
        receivedToken.bskySession.refreshJwt,
      );

      const now = Date.now();

      if (now >= refreshToken.exp * 1000) {
        throw new Error("Refresh token expired");
      }

      const accessToken: { iat: number; exp: number } = jwtDecode(
        receivedToken.bskySession.accessJwt,
      );

      if (now >= accessToken.exp * 1000) {
        console.log("Access token expired, refreshing");
        const { data } = await agent.com.atproto.server.refreshSession(
          undefined,
          {
            headers: {
              authorization: "Bearer " + session.user.bskySession.refreshJwt,
            },
          },
        );
        session.user.bskySession.refreshJwt = data.refreshJwt;
        session.user.bskySession.accessJwt = data.accessJwt;
        session.user.handle = data.handle;
        session.user.id = data.did;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
