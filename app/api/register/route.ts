import prisma from "@/prismadb";
import { VerificationTokenType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "../lib/mailer";
import { PasswordManager } from "../lib/password-manager";
import { createOrUpdateVerificationToken } from "../lib/token";

export async function POST(request: Request) {
  try {
    const { email, password, confirmPassword, name, termsAccepted } =
      await request.json();

    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "email, password and confirmPassword are required" },
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

    if (!termsAccepted) {
      return NextResponse.json(
        { error: "terms must be accepted" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name: name || "",
        hashedPassword,
        termsAccepted,
      },
    });

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const emailToken = await createOrUpdateVerificationToken(
      user.id,
      VerificationTokenType.VERIFY_EMAIL,
      expires
    );

    await sendVerificationEmail(email, emailToken.token);

    return NextResponse.json(
      {
        message: "user created successfully",
        user: { id: user.id, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
