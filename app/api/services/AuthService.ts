import { VerificationTokenType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PasswordManager } from "../lib/password-manager";
import { IUserRepository } from "../repositories/User";
import { IVerificationTokenRepository } from "../repositories/VerificationToken";

export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private verificationTokenRepository: IVerificationTokenRepository
  ) {}

  async updatePassword(
    token: string,
    password: string,
    confirmPassword: string
  ) {
    if (!token || !password || !confirmPassword) {
      throw new Error("token, password and confirmPassword are required");
    }

    const { ok, error: validationError } = PasswordManager.validatePassword(
      password,
      confirmPassword
    );
    if (!ok) {
      throw new Error(validationError);
    }

    const verificationToken =
      await this.verificationTokenRepository.findByTokenAndType(
        token,
        VerificationTokenType.RESET_PASSWORD
      );

    if (!verificationToken) {
      throw new Error("invalid token");
    }
    if (verificationToken.expires < new Date()) {
      throw new Error("expired token");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.updatePassword(
      verificationToken.userId,
      hashedPassword
    );

    return { message: "" };
  }
}
