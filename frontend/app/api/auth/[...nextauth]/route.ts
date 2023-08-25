import { redirect } from "next/navigation";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        try {
          const { user, jwt } =
            (await axios
              .post(`${process.env.API_URL}/auth/local`, {
                identifier: credentials.email,
                password: credentials.password,
              })
              .then((response) => {
                return response.data;
              })
              .catch((error) => {
                throw new Error(error.response.data.message);
              })) || null;

          return { jwt, ...user };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }: any) => {
      session.user = token as any;
      session.user.id = token ? token.id : null;
      session.user.name = token ? token.name : null;

      return Promise.resolve(session);
    },

    jwt: async ({ token, user, account }: any) => {
      const isSignIn = user ? true : false;
      if (isSignIn && account) {
        try {
          const response = await fetch(
            `${process.env.API_URL}/auth/${account.provider}/callback?access_token=${account?.access_token}`
          );
          const data = await response.json();

          token.jwt = data?.data !== null ? data.jwt : user.jwt;
          token.id = data?.data !== null ? data.user.id : user.id;
          token.provider =
            data?.data !== null ? data.user.provider : user.provider;
          if (data?.data === null) token.name = user.name;
        } catch (error) {
          console.error("Fetch failed:", error);
        }
      }
      return Promise.resolve(token);
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
