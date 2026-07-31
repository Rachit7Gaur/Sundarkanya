import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authApi from "../api/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      authApi
        .getProfile()
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // =========================
  // OLD EMAIL LOGIN
  // =========================

  async function login(data) {
    const res = await authApi.loginUser(data);

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    return res.data;
  }

  // =========================
  // OLD EMAIL REGISTER
  // =========================

  async function register(data) {
    const res = await authApi.registerUser(data);

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    return res.data;
  }

  // =========================
  // MOBILE - SEND OTP
  // =========================

  async function sendOtp(phone) {
    const res = await authApi.sendOTP({
      phone,
    });

    return res.data;
  }

  // =========================
  // MOBILE - VERIFY OTP
  // =========================

  async function verifyOtp(phone, otp) {
    const res = await authApi.verifyOTP({
      phone,
      otp,
    });

    // Save JWT first
    localStorage.setItem("token", res.data.token);

    // Save logged-in user
    setUser(res.data.user);

    return res.data;
  }

  // =========================
  // UPDATE USER IN CONTEXT
  // =========================

  function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  // =========================
  // LOGOUT
  // =========================

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        // Existing authentication
        login,
        register,

        // Mobile authentication
        sendOtp,
        verifyOtp,

        // Profile
        updateUser,

        // Logout
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);