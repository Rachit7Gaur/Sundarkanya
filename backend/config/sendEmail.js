import nodemailer from "nodemailer";

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 30000,
});

const sendEmail = async (options) => {
  const info = await transporter.sendMail({
    from: `"SundarKanya Support" <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });

  console.log("Email sent successfully:", info.messageId);
};

export default sendEmail;