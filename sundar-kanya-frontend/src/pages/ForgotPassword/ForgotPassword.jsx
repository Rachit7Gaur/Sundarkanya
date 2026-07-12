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
        "Password reset link sent to your email"
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

    <div className="forgot-page">

      <div className="forgot-card">

        <h1>
          Forgot Password
        </h1>

        <p>
          Enter your email to receive a password reset link.
        </p>


        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
            required
          />


          <button type="submit" disabled={loading}>

            {
              loading
              ? "Sending..."
              : "Send Reset Link"
            }

          </button>

        </form>


        <Link to="/login">
          Back to Login
        </Link>


      </div>

    </div>

  );
};


export default ForgotPassword;