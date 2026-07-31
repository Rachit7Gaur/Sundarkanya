import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import "./CompleteProfile.css";

function CompleteProfile() {
  const navigate = useNavigate();

  const { user, updateUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      await updateUser({
        name: name.trim(),
        email: email.trim(),
      });

      updateUser(data.user);

      toast.success("Profile completed successfully");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Unable to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="complete-profile-page">

      <div className="complete-profile-card">

        <div className="complete-profile-brand">
          <h1>
            Sundar<span>Kanya</span>
          </h1>

          <p>Luxury Jewellery Collection</p>
        </div>

        <h2>Complete Your Profile</h2>

        <p className="complete-profile-description">
          Just a few details and your Sundar Kanya
          account will be ready.
        </p>

        {/* MOBILE NUMBER */}

        <div className="profile-phone-box">

          <span>Mobile Number</span>

          <strong>
            +91 {user?.phone}
          </strong>

          <small>
            ✓ Verified
          </small>

        </div>

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <div className="profile-field">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>

          {/* EMAIL */}

          <div className="profile-field">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="complete-profile-btn"
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue"}
          </button>

        </form>

      </div>

    </section>
  );
}

export default CompleteProfile;