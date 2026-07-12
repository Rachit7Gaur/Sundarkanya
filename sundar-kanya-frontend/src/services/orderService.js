import api from "./api";

// Place Order
export const placeOrder = async (data) => {
  const response = await api.post("/orders", data);
  return response.data;
};

// Logged-in User Orders
export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Single Order
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const res = await api.put(`/orders/${orderId}/cancel`);
  return res.data;
};

// =========================
// ADMIN
// =========================

// Get All Orders
export const getAllOrders = async () => {
  const response = await api.get("/orders/all");
  return response.data;
};

// Update Order Status
export const updateOrderStatus = async (id, orderStatus) => {
  const response = await api.put(`/orders/${id}/status`, {
    orderStatus,
  });

  return response.data;
};

// Update Payment Status
export const updatePaymentStatus = async (id, paymentStatus) => {
  const response = await api.put(`/orders/${id}/payment`, {
    paymentStatus,
  });

  return response.data;
};