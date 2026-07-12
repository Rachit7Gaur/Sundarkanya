import api from "./api";

// Get account settings
export const getSettings = async () => {
  const res = await api.get("/auth/settings");
  return res.data;
};

// Update account settings
export const updateSettings = async (data) => {
  const res = await api.put("/auth/settings", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.put(
    "/auth/change-password",
    data
  );

  return res.data;
};

export const forgotPassword = async (data) => {

  const res = await api.post(
    "/auth/forgot-password",
    data
  );

  return res.data;

};