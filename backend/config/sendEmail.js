import nodemailer from "nodemailer";

const sendEmail = async (options) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  const info = await transporter.sendMail({
    from: `"SundarKanya Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });


  console.log("Email sent successfully:", info.messageId);

};


export default sendEmail;