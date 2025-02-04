import prisma from "@/prismadb";
import { VerificationToken, VerificationTokenType } from "@prisma/client";

export interface IVerificationTokenRepository {
  findByTokenAndType(
    token: string,
    type: VerificationTokenType
  ): Promise<VerificationToken | null>;
}

export class PrismaVerificationTokenRepository
  implements IVerificationTokenRepository
{
  async findByTokenAndType(
    token: string,
    type: VerificationTokenType
  ): Promise<VerificationToken | null> {
    return prisma.verificationToken.findFirst({
      where: { token, type },
    });
  }
}
