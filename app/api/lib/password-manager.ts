export class PasswordManager {
  static validatePassword(
    password: string,
    confirmPassword: string
  ): { ok: boolean; error?: string } {
    if (password.length < 8) {
      return { ok: false, error: "password must be at least 8 characters" };
    }

    if (password !== confirmPassword) {
      return { ok: false, error: "password and confirmPassword must match" };
    }

    return { ok: true };
  }
}
