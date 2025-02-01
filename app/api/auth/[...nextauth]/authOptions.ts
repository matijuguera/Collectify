import prisma from "@/prismadb";
import bcrypt from "bcrypt";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // We store null for google sign in users
        if (!user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword || ""
        );
        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        if (!user.emailVerified) {
          throw new Error("Email not verified");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const email = profile?.email;

        if (!email) {
          throw new Error("No email returned from Google");
        }

        let existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!existingUser) {
          // TODO: add Provider to user

          existingUser = await prisma.user.create({
            data: {
              email,
              name: profile?.name || "",
              emailVerified: new Date(),
              hashedPassword: null,
            },
          });
        }

        return true;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session && session.user) {
        // @ts-expect-error ignore id error
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
