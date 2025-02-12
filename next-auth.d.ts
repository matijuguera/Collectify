import { UserType } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      type: UserType;
    };
  }
  interface User {
    id: string;
    email: string;
    name: string;
    type: UserType;
  }
}
