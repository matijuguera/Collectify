import { PrismaClient, Set } from "@prisma/client";

const prisma = new PrismaClient();

export interface ISetRepository {
    create(name: string, photo: Uint8Array<ArrayBufferLike>, theme_id: string): Promise<Set>;
    list(): Promise<Set[]>;
    get(id: string): Promise<Set | null>;
    update(id: string, name: string, photo: Uint8Array<ArrayBufferLike>): Promise<Set>;
    delete(id: string): Promise<void>;
}

export class SetRepository implements ISetRepository {
    async create(name: string, photo: Uint8Array<ArrayBufferLike>, theme_id: string): Promise<Set> {
        return prisma.set.create({
            data: { name, photo, theme_id },
        });
    }

    async list(): Promise<Set[]> {
        return prisma.set.findMany();
    }

    async get(id: string): Promise<Set | null> {
        return prisma.set.findFirst({
            where: { id },
        });
    }

    async update(id: string, name: string, photo: Uint8Array<ArrayBufferLike>): Promise<Set> {
        return prisma.set.update({
            where: { id },
            data: { name, photo },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.set.delete({
            where: { id },
        });
    }
}