import prisma from "@/prismadb";
import { Theme } from "@prisma/client";

export interface IThemeRepository {
  create(name: string, photo: Uint8Array<ArrayBufferLike>): Promise<Theme>;
  list(): Promise<Theme[]>;
  get(id: string): Promise<Theme|null>;
}

export class PrismaThemeRepository implements IThemeRepository {
  async create(
    name: string,
    photo: Uint8Array<ArrayBufferLike>
  ): Promise<Theme> {
    return prisma.theme.create({
      data: { name, photo },
    });
  }
  async list(): Promise<Theme[]> {
    return prisma.theme.findMany();
  }
  async get(id: string): Promise<Theme|null> {
    return prisma.theme.findFirst({
      where: { id },
    });
  }
}
