import prisma from "@/prismadb";
import { VerificationTokenType } from "@prisma/client";
import { NextResponse } from "next/server";
import { sendResetPasswordEmail } from "../lib/mailer";
import { createOrUpdateVerificationToken } from "../lib/token";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "",
        },
        { status: 201 }
      );
    }

    const expires = new Date(Date.now() + 15 * 60 * 1000);
    const passwordToken = await createOrUpdateVerificationToken(
      user.id,
      VerificationTokenType.RESET_PASSWORD,
      expires
    );

    await sendResetPasswordEmail(email, passwordToken.token);

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
