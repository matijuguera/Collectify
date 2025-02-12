import { Card, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ICardRepository {
  create(
    identifier: string,
    name: string,
    photo: Uint8Array | null,
    set_id: string
  ): Promise<Card>;
  list(
    searchParams: {
      themeName?: string;
      setName?: string;
      cardIdentifier?: string;
    },
    skip: number,
    take: number
  ): Promise<Card[]>;
  get(id: string): Promise<Card | null>;
  update(
    id: string,
    identifier?: string,
    name?: string,
    photo?: Uint8Array | null
  ): Promise<Card>;
  delete(id: string): Promise<void>;
}

export class CardRepository implements ICardRepository {
  async create(
    identifier: string,
    name: string,
    photo: Uint8Array | null,
    set_id: string
  ): Promise<Card> {
    return prisma.card.create({
      data: {
        identifier,
        name,
        photo: photo ? Buffer.from(photo) : new Uint8Array(),
        set_id,
      },
    });
  }

  async list(
    searchParams: {
      themeName?: string;
      setName?: string;
      cardIdentifier?: string;
    },
    skip: number,
    take: number
  ): Promise<Card[]> {
    return prisma.card.findMany({
      where: {
        set: {
          theme: {
            name: { contains: searchParams.themeName, mode: "insensitive" },
          },
          name: { contains: searchParams.setName, mode: "insensitive" },
        },
        identifier: {
          contains: searchParams.cardIdentifier,
          mode: "insensitive",
        },
      },
      skip,
      take,
      include: { set: { include: { theme: true } } },
    });
  }

  async get(id: string): Promise<Card | null> {
    return prisma.card.findUnique({
      where: { id },
      include: { set: { include: { theme: true } } },
    });
  }

  async update(
    id: string,
    identifier?: string,
    name?: string,
    photo?: Uint8Array | null
  ): Promise<Card> {
    return prisma.card.update({
      where: { id },
      data: { identifier, name, photo: photo ? Buffer.from(photo) : undefined },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.card.delete({
      where: { id },
    });
  }
}
