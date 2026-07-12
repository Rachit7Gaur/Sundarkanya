import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

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
        })
        .finally(() => setLoading(false));

    } else {

      setLoading(false);

    }

  }, []);

  async function login(data) {

    const res = await authApi.loginUser(data);

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    return res.data;

  }

  async function register(data) {

    const res = await authApi.registerUser(data);

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    return res.data;

  }

  function logout() {

    localStorage.removeItem("token");

    setUser(null);

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);