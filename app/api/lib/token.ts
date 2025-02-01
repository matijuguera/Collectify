import prisma from "@/prismadb";
import { VerificationTokenType } from "@prisma/client";
import { randomBytes } from "crypto";

export async function createOrUpdateVerificationToken(
  userId: string,
  type: VerificationTokenType,
  expires: Date
) {
  const verificationToken = randomBytes(32).toString("hex");

  const currentVerificationToken = await prisma.verificationToken.findFirst({
    where: { userId: userId, type: type },
  });
  if (currentVerificationToken) {
    return prisma.verificationToken.update({
      where: { id: currentVerificationToken.id },
      data: {
        token: verificationToken,
        expires,
      },
    });
  }

  return prisma.verificationToken.create({
    data: {
      token: verificationToken,
      userId: userId,
      expires,
      type,
    },
  });
}
