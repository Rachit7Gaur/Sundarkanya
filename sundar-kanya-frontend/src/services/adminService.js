import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};


export const getWebsiteSettings = async () => {
  const { data } = await api.get("/settings");
  return data;
};

