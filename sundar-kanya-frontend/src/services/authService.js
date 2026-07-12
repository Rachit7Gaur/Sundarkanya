import api from "./api";

// Register
export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Login
export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// Profile
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const resetPassword = async (token, data) => {

  const res = await api.put(
    `/auth/reset-password/${token}`,
    data
  );

  return res.data;

};