import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/userService";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await forgotPassword({ email });

      toast.success(
        "Password reset link sent successfully."
      );

      setEmail("");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sk-forgot-page">

      <div className="sk-forgot-card">

       <div className="sk-brand">
        <h1>
            Sundar<span>Kanya</span>
        </h1>

        <p>Luxury Jewellery Collection</p>
    </div>

        <h2>Forgot Password?</h2>

        <p>
          Enter your registered email address and we'll
          send you a secure password reset link.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="sk-forgot-input">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="sk-forgot-btn"
            disabled={loading}
          >
            {loading
              ? "Sending Link..."
              : "Send Reset Link"}
          </button>

        </form>

        <div className="sk-forgot-links">

          <Link to="/login">
            ← Back to Login
          </Link>

        </div>

      </div>

    </section>
  );
};

export default ForgotPassword;