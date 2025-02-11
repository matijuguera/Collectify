import NextAuth from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export const { auth, signIn, signOut } = NextAuth(authOptions);
