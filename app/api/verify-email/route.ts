import prisma from "@/prismadb";
import { VerificationTokenType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "token is required" }, { status: 400 });
    }

    const existingToken = await prisma.verificationToken.findUnique({
      where: { token, type: VerificationTokenType.VERIFY_EMAIL },
    });

    if (!existingToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (existingToken.expires < new Date()) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: existingToken.userId },
      data: { emailVerified: new Date() },
    });

    return NextResponse.json(
      {
        message: "email verified successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
