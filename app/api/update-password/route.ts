import prisma from "@/prismadb";
import { VerificationTokenType } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { PasswordManager } from "../lib/password-manager";

export async function POST(request: Request) {
  try {
    const { token, password, confirmPassword } = await request.json();

    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "token, password and confirmPassword are required" },
        { status: 400 }
      );
    }

    const { ok, error } = PasswordManager.validatePassword(
      password,
      confirmPassword
    );
    if (!ok) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token, type: VerificationTokenType.RESET_PASSWORD },
    });

    if (!verificationToken) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }

    if (verificationToken.expires < new Date()) {
      return NextResponse.json({ error: "expired token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: {
        hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
