import prisma from "@/prismadb";
import { Theme } from "@prisma/client";

export interface IThemeRepository {
  create(name: string, photo: Uint8Array<ArrayBufferLike>): Promise<Theme>;
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
}
