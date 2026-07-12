import "./Newsletter.css";
import { useState } from "react";
import axios from "axios";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/newsletter/subscribe", { email });

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Subscription failed:", err);
      setStatus("error");
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <span className="newsletter-tag">✨ Join Our Community</span>
        <h2>Get Exclusive Offers</h2>
        <p>
          Subscribe to receive updates on new arrivals,
          special discounts and jewellery collections.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Subscribe</button>
        </form>

        {status === "success" && (
          <p className="success-msg">🎉 Thank you for subscribing!</p>
        )}
        {status === "error" && (
          <p className="error-msg">⚠️ Something went wrong. Try again.</p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
