// lib/send-email.ts
import nodemailer from "nodemailer";

type EmailParams = {
  to: string[];
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: EmailParams) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"QR Label" <${process.env.GMAIL_USER}>`,
    to: to.join(","),
    subject,
    text,
  });
}
