import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session }) {
      const adminEmails = ["lokesh23120@iiitd.ac.in"]; 

      if (session.user?.email && adminEmails.includes(session.user.email)) {
        session.user.role = "admin";
      } else {
        session.user.role = "user";
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
