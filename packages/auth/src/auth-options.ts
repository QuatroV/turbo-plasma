import { type GetServerSidePropsContext } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@plasma/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "your@mail.com" },
        password: {
          label: "password",
          type: "password",
          placeholder: "********",
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "Your Name",
        },
        isNewUser: {
          label: "New User",
          type: "checkbox",
          placeholder: "New User",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials?.email || !credentials?.password) {
          return null;
        }

        // Registration flow
        if (credentials.isNewUser) {
          const newUser = await prisma.user.create({
            data: {
              name: credentials.name,
              surname: "",
              isBanned: false,
              email: credentials.email,
              password: credentials.password,
            },
          });

          return newUser;
        }

        // Login flow
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (!user) {
          return null;
        }

        return { name: user.name, id: user.id, email: user.email };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
