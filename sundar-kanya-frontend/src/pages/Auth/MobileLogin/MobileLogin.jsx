import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import "./MobileLogin.css";

function MobileLogin() {
  const navigate = useNavigate();

  const { sendOtp, verifyOtp } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // SEND OTP
  // =========================

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      await sendOtp(phone);

      setOtpSent(true);

      toast.success("OTP sent successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      toast.error("Enter the 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const result = await verifyOtp(phone, otp);

      toast.success("Login successful");

      if (result.isNewUser) {
        navigate("/complete-profile");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mobile-login-page">

      <div className="mobile-login-card">

        {/* Brand */}

        <div className="mobile-login-brand">
          <h1>
            Sundar<span>Kanya</span>
          </h1>

          <p>Luxury Jewellery Collection</p>
        </div>

        {!otpSent ? (
          <>
            <h2>Welcome Back</h2>

            <p className="mobile-login-description">
              Login or create your account using your
              mobile number.
            </p>

            <form onSubmit={handleSendOtp}>

              <label>
                Mobile Number
              </label>

              <div className="mobile-phone-input">

                <span>+91</span>

                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength="10"
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="mobile-login-btn"
              >
                {loading
                  ? "Sending OTP..."
                  : "Continue"}
              </button>

            </form>
          </>
        ) : (
          <>
            <h2>Verify Mobile Number</h2>

            <p className="mobile-login-description">
              We sent a 6-digit OTP to
            </p>

            <strong className="mobile-number-display">
              +91 {phone}
            </strong>

            <form onSubmit={handleVerifyOtp}>

              <label>
                Enter OTP
              </label>

              <input
                className="mobile-otp-input"
                type="tel"
                inputMode="numeric"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />

              <button
                type="submit"
                disabled={loading}
                className="mobile-login-btn"
              >
                {loading
                  ? "Verifying..."
                  : "Verify & Continue"}
              </button>

            </form>

            <button
              className="change-number-btn"
              onClick={() => {
                setOtpSent(false);
                setOtp("");
              }}
            >
              Change Mobile Number
            </button>
          </>
        )}

        <div className="mobile-login-divider">
          <span>or</span>
        </div>

        <button
          className="email-login-btn"
          onClick={() => navigate("/login")}
        >
          Continue with Email
        </button>

      </div>

    </section>
  );
}

export default MobileLogin;