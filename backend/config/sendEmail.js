import axios from "axios";

const sendEmail = async (options) => {

  try {
  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: "SundarKanya Support",
        email: "sundarkanya.support@gmail.com",
      },
      to: [{ email: options.email }],
      subject: options.subject,
      htmlContent: options.message,
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("✅ Email sent successfully");
} catch (err) {
  console.log(err.response?.data || err.message);
}
};

export default sendEmail;