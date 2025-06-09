import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail({
  to,
  token,
  userId,
}: {
  to: string;
  token: string;
  userId: string;
}) {
  const resetUrl = `${process.env.FRONTEND_URL}/authentication/password-reset?token=${token}&id=${userId}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Reset your password',
    html: `
      <h3>Reset your password</h3>
      <p>Click the link below to reset your password:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>This link expires in 1 hour.</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Nodemailer Email sent:', info.messageId);
  return info;
}
