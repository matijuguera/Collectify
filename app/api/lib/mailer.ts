// lib/mailer.ts
import nodemailer from "nodemailer";

// TODO: improve and create template

export async function sendVerificationEmail(to: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pages/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"Collectify" <no-reply@tuapp.com>',
    to,
    subject: "Verify your email",
    html: `
        <p>Thank you for signing up for Collectify. To verify your account, click here:</p>
        <a href="${verifyUrl}">Verify</a>
        <p>This link will expire in 24 hours.</p>
    `,
  });
}

export async function sendResetPasswordEmail(to: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/pages/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"Collectify" <no-reply@tuapp.com>',
    to,
    subject: "Reset your password",
    html: `
      <p>We received a request to reset your Collectify password. If you didn't make this request, you can safely ignore this email.</p>
      <p>To reset your password, click the link below:</p>
      <a href="${url}">Reset Password</a>
      <p>This link will expire in 24 hours.</p>
      <p>If you have any issues, please contact our support team.</p>
      <p>Thank you,</p>
      <p>The Collectify Team</p>
    `,
  });
}
