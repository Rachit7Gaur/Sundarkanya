import api from "../../api/axios";

export const getDashboardStats = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

export const getAllOrders = async () => {
  const { data } = await api.get("/admin/orders");
  return data;
};

export const getOrderDetails = async (id) => {
  const { data } = await api.get(`/admin/orders/${id}`);
  return data;
};

export const updateOrderStatus = async (id, orderStatus) => {
  const { data } = await api.patch(`/admin/orders/${id}`, {
    orderStatus,
  });
  return data;
};

export const getCustomers = async () => {
  const { data } = await api.get("/admin/customers");
  return data;
};

export const getCustomerById = async (id) => {
  const { data } = await api.get(`/admin/customers/${id}`);
  return data;
};

export const getAnalytics = async (range) => {
  const { data } = await api.get(`/admin/analytics?range=${range}`);
  return data;
};

export const getSubscribers = async () => {
  const { data } = await api.get("/admin/newsletter");
  return data;
};

export const deleteSubscriber = async (id) => {
  const { data } = await api.delete(
    `/admin/newsletter/${id}`
  );

  return data;
};

export const getSettings = async () => {
  const { data } = await api.get("/admin/settings");
  return data;
};

export const updateSettings = async (settings) => {
  const { data } = await api.put(
    "/admin/settings",
    settings
  );
  return data;
};

export const searchAdmin = async (query) => {
  const { data } = await api.get(
    `/admin/search?q=${encodeURIComponent(query)}`
  );
  return data;
};

export const getNotifications = async () => {
  const { data } = await api.get("/admin/notifications");
  return data;
};