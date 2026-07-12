import api from "./api";

// Get wishlist
export const getWishlist = async () => {
  const res = await api.get("/wishlist");
  return res.data;
};

// Add or Remove product
export const toggleWishlist = async (productId) => {
  const res = await api.post("/wishlist", {
    productId,
  });

  return res.data;
};