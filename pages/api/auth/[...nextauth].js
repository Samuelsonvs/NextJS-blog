import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),

    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],

  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/error", // Error code passed in query string as ?error=
    //verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/", // If set, new users will be directed here on first sign in
  },

  // A database is optional, but required to persist accounts in a database
  //local
  // adapter: PrismaAdapter(prisma),
  // database: process.env.DATABASE_URL,
  //cloud
  database: process.env.MONGO_DB_URI,
});
