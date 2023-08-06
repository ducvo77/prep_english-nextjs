// https://www.youtube.com/watch?v=0eu4_lLFkGk

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = false;
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ user, session, token }: any) {
      session.user = token as any;
      session.user.id = user ? user.id : null;
      return Promise.resolve(session);
    },

    async jwt({ token, user, account }: any) {
      const isSignIn = user ? true : false;
      if (isSignIn && account) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.access_token}`
          );
          const data = await response.json();
          console.log("Strapi Callback Data >>>>>>>>>>>>>> ", data);
          token.jwt = data.jwt;
          token.id = data.user.id;
        } catch (error) {
          console.error("Fetch failed:", error);
        }
      }
      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // database: process.env.NEXT_PUBLIC_DATABASE_URL as string,
};

export default NextAuth(authOptions);
