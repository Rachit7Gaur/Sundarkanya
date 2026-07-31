import api from "./axios";

export const registerUser = (data)=>{
  return api.post("/auth/register", data);
};

export const loginUser = (data)=>{
  return api.post("/auth/login", data);
};

export const getProfile= (data)=>{
  return api.get("/auth/profile");
};

export const updateSettings = async (data) => {
  return api.put("/auth/settings", data);
};

export const sendOTP = (data) => {
  return api.post("/auth/send-otp", data);
};

export const verifyOTP = (data) => {
  return api.post("/auth/verify-otp", data);
};