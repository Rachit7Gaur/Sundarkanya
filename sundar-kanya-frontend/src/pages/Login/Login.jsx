import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sk-login-page">
      <div className="sk-login-card">

<div className="sk-brand">
    <h1>
        Sundar<span>Kanya</span>
    </h1>

    <p>Luxury Jewellery Collection</p>
</div>
        <h2>Welcome Back 👋</h2>

        <p>
          Sign in to continue shopping your favourite
          jewellery.
        </p>

        {error && (
          <div className="sk-error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="sk-input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sk-input-group">
            <label>Password</label>

            <div className="sk-password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="sk-eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>

            </div>
          </div>

          <button
            className="sk-login-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="sk-divider">
          <span>OR</span>
        </div>

        <div className="sk-login-links">

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

          <p>
            New to SundarKanya?{" "}
            <Link to="/register">
              Create Account
            </Link>
          </p>

        </div>

      </div>
    </section>
  );
}

export default Login;