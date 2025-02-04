import { NextResponse } from "next/server";
import { PrismaUserRepository } from "../repositories/User";
import { PrismaVerificationTokenRepository } from "../repositories/VerificationToken";
import { AuthService } from "../services/AuthService";

export async function POST(request: Request) {
  try {
    const { token, password, confirmPassword } = await request.json();
    const userRepository = new PrismaUserRepository();
    const verificationTokenRepository = new PrismaVerificationTokenRepository();

    const authService = new AuthService(
      userRepository,
      verificationTokenRepository
    );
    const result = await authService.updatePassword(
      token,
      password,
      confirmPassword
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
