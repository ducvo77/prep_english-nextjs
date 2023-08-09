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
                console.log(error.response);
                throw new Error(error.response.data.message);
              })) || null;

          return { jwt, ...user };
        } catch (error) {
          console.warn(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ user, session, token }: any) {
      // console.log(token);

      session.user = token as any;
      session.user.id = token ? token.id : null;
      return Promise.resolve(session);
    },

    async jwt({ token, user, account }: any) {
      // console.log(account);

      const isSignIn = user ? true : false;
      if (isSignIn && account) {
        try {
          const response = await fetch(
            `${process.env.API_URL}/auth/${account.provider}/callback?access_token=${account?.access_token}`
          );
          const data = await response.json();
          // console.log("Strapi Callback Data >>>>>>>>>>>>>> ", data);

          token.jwt = data.jwt;
          token.id = data.user.id;
        } catch (error) {
          console.error("Fetch failed:", error);
        }
      }
      return Promise.resolve(token);
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
