import { useState } from "react";
import { sendContactMessage } from "../../services/contactService";
import toast from "react-hot-toast";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await sendContactMessage(form);

    toast.success("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    console.log(error);
    toast.error("Failed to send message");
  }
};

  return (
    <div className="contact-page">

      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you 💖</p>
        </div>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Get In Touch</h2>

          <div className="info-card">
            <h3>📧 Email</h3>
            <p>support@sundarkanya.com</p>
          </div>

          <div className="info-card">
            <h3>📱 Phone</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="info-card">
            <h3>📍 Address</h3>
            <p>Bijnor, Uttar Pradesh, India</p>
          </div>

          <div className="info-card">
            <h3>🕒 Working Hours</h3>
            <p>Monday - Saturday</p>
            <p>10:00 AM - 7:00 PM</p>
          </div>

        </div>

        <div className="contact-form">

          <h2>Send us a Message</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Contact;