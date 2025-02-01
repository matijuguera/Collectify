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

  // ------ CALLBACKS, PAGINAS, ETC. ------
  callbacks: {
    // Este callback se llama al crear un JWT (cuando inicia sesión un usuario)
    async jwt({ token, user }) {
      // Cuando user existe, es la primera vez que se crea el token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    // Este callback se llama cada vez que entras a una página y NextAuth revisa la sesión
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
