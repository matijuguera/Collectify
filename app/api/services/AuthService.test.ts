import { PrismaUserRepository } from "@/api/repositories/User";
import { PrismaVerificationTokenRepository } from "@/api/repositories/VerificationToken";
import { AuthService } from "@/api/services/AuthService";
import prisma from "@/prismadb";
import { VerificationTokenType } from "@prisma/client";

describe("AuthService.updatePassword", () => {
  const userRepository = new PrismaUserRepository();
  const verificationTokenRepository = new PrismaVerificationTokenRepository();
  const authService = new AuthService(
    userRepository,
    verificationTokenRepository
  );

  beforeEach(async () => {
    await prisma.verificationToken.deleteMany({});
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  /**
   * Given: Valid user and a valid token
   * When: Updating the password
   * Then: The password should be updated
   */
  it("should update the user's password", async () => {
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        hashedPassword: "initialPassword",
      },
    });

    await prisma.verificationToken.create({
      data: {
        token: "reset-token",
        type: VerificationTokenType.RESET_PASSWORD,
        userId: user.id,
        expires: new Date(Date.now() + 60_000), // valid for 1 minute
      },
    });

    await authService.updatePassword("reset-token", "newSecret", "newSecret");

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.hashedPassword).not.toBe("initialPassword");
  });

  /**
   * Given: No token provided
   * When: Updating the password
   * Then: It should throw an error indicating required fields
   */
  it("should throw an error if the token is missing", async () => {
    await expect(
      authService.updatePassword("", "newPassword", "newPassword")
    ).rejects.toThrow("token, password and confirmPassword are required");
  });

  /**
   * Given: Missing password fields
   * When: Updating the password
   * Then: It should throw an error indicating required fields
   */
  it("should throw an error if password or confirmPassword is missing", async () => {
    await expect(
      authService.updatePassword("some-token", "", "newPassword")
    ).rejects.toThrow("token, password and confirmPassword are required");

    await expect(
      authService.updatePassword("some-token", "newPassword", "")
    ).rejects.toThrow("token, password and confirmPassword are required");
  });

  /**
   * Given: Passwords that do not match
   * When: Updating the password
   * Then: It should throw a password mismatch error
   */
  it("should throw an error if the passwords do not match", async () => {
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        hashedPassword: "oldPassword",
      },
    });

    // Valid token for that user
    await prisma.verificationToken.create({
      data: {
        token: "reset-token",
        type: VerificationTokenType.RESET_PASSWORD,
        userId: user.id,
        expires: new Date(Date.now() + 60_000),
      },
    });

    await expect(
      authService.updatePassword(
        "reset-token",
        "newPassword",
        "differentPassword"
      )
    ).rejects.toThrow("password and confirmPassword must match");
  });

  /**
   * Given: Invalid (non-existent) token
   * When: Updating the password
   * Then: It should throw an error indicating invalid token
   */
  it("should throw an error if the token is invalid", async () => {
    await prisma.user.create({
      data: {
        email: "test@example.com",
        hashedPassword: "oldPassword",
      },
    });

    // Notice we never create a verification token in the DB

    await expect(
      authService.updatePassword(
        "non-existent-token",
        "newPassword",
        "newPassword"
      )
    ).rejects.toThrow("invalid token");
  });

  /**
   * Given: Expired token
   * When: Updating the password
   * Then: It should throw an error indicating expired token
   */
  it("should throw an error if the token is expired", async () => {
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        hashedPassword: "oldPassword",
      },
    });

    // Create a token that is already expired
    await prisma.verificationToken.create({
      data: {
        token: "expired-token",
        type: VerificationTokenType.RESET_PASSWORD,
        userId: user.id,
        expires: new Date(Date.now() - 60_000), // 1 minute in the past
      },
    });

    await expect(
      authService.updatePassword("expired-token", "newPassword", "newPassword")
    ).rejects.toThrow("expired token");
  });
});
