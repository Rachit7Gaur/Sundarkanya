import "./Newsletter.css";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

function Newsletter() {
  const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter your email");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/newsletter/subscribe", {
        email,
      });

      toast.success(data.message || "Subscribed successfully!");
      setSubscribed(true);

      setTimeout(() => {
        setSubscribed(false);
      }, 3000);

      setEmail("");
    }  catch (err) {
  console.log("Newsletter Error:", err.response?.data);

  toast.error(
    err.response?.data?.message ||
    err.response?.data?.error ||
    "Subscription failed"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <span className="newsletter-tag">
          ✨ Join Our Community
        </span>

        <h2>Get Exclusive Offers</h2>

        <p>
          Subscribe to receive updates about new jewellery
          collections, festive offers, exclusive discounts
          and special promotions from Sundar Kanya.
        </p>

        <form
          className="newsletter-form"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
          type="submit"
          disabled={loading || subscribed}
        >
          {loading
            ? "Subscribing..."
            : subscribed
            ? "✓ Subscribed"
            : "Subscribe"}
        </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;