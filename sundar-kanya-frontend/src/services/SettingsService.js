import api from "./api";

export const getWebsiteSettings = async () => {
  const { data } = await api.get("/settings");
  return data;
};