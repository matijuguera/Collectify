-- CreateEnum
CREATE TYPE "VerificationTokenType" AS ENUM ('VERIFY_EMAIL', 'RESET_PASSWORD');

-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "type" "VerificationTokenType" NOT NULL DEFAULT 'VERIFY_EMAIL';
