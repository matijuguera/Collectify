import prisma from "@/prismadb";
import { User } from "@prisma/client";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  updatePassword(userId: string, hashedPassword: string): Promise<User>;
}

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: { hashedPassword },
    });
  }
}
