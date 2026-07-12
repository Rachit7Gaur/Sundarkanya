import api from "./api";

// Get cart
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// Add product to cart
export const addToCart = async (productId, quantity) => {
  const response = await api.post("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

// Remove product
export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};

// Clear cart
export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};

export const updateCartQuantity = async(productId, quantity)=>{
  const response = await api.put("/cart",{
    productId,
    quantity
  });

  return response.data;
};