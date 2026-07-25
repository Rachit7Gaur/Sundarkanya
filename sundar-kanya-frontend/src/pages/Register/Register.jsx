import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  password: "",
  confirmPassword: "",
});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

await register({
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  gender: formData.gender,
  dateOfBirth: formData.dateOfBirth,
  password: formData.password,
});
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sk-register-page">
      <div className="sk-register-card">

        <div className="sk-brand">
          <h1>
            Sundar<span>Kanya</span>
          </h1>
          <p>Luxury Jewellery Collection</p>
        </div>

        <h2>Create Account</h2>

        <p className="sk-register-subtitle">
          Join SundarKanya and discover timeless jewellery.
        </p>

        {error && (
          <div className="sk-register-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="sk-register-input">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sk-register-input">
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

          <div className="register-input-group">
          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

          <div className="sk-register-input">
            <label>Password</label>

            <div className="sk-register-password">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="sk-register-eye"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>
          </div>

          <div className="sk-register-input">
            <label>Confirm Password</label>

            <div className="sk-register-password">

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="sk-register-eye"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>
          </div>

         <div className="register-input-group">
  <label>Gender</label>

  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    required
  >
    <option value="">Select Gender</option>
    <option value="Female">Female</option>
    <option value="Male">Male</option>
    <option value="Other">Other</option>
  </select>
</div>

<div className="register-input-group">
  <label>Date of Birth</label>

  <input
    type="date"
    name="dateOfBirth"
    value={formData.dateOfBirth}
    onChange={handleChange}
    required
  />
</div>
          <button
            className="sk-register-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="sk-register-links">
          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}

export default Register;