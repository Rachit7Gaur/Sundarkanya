import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../../services/authService";
import "./ResetPassword.css";

const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }


    try {

      setLoading(true);


      await resetPassword(token, {
        password,
      });


      toast.success(
        "Password reset successfully"
      );


      navigate("/login");


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to reset password"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="reset-page">

      <div className="reset-card">

        <h1>
          Reset Password
        </h1>


        <form onSubmit={handleSubmit}>


          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
            }
            required
          />


          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>
              setConfirmPassword(e.target.value)
            }
            required
          />


          <button
            type="submit"
            disabled={loading}
          >

            {
              loading
              ? "Updating..."
              : "Reset Password"
            }

          </button>


        </form>

      </div>

    </div>

  );

};


export default ResetPassword;