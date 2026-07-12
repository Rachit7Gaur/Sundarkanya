import api from "./api";

// Get all reviews of a product
export const getReviews = async (productId) => {
  const res = await api.get(`/reviews/product/${productId}`);
  return res.data;
};

// Add review
export const addReview = async (productId, reviewData) => {
  const res = await api.post(
    `/reviews/product/${productId}`,
    reviewData
  );
  return res.data;
};

// Update review
export const updateReview = async (reviewId, reviewData) => {
  const res = await api.put(
    `/reviews/${reviewId}`,
    reviewData
  );
  return res.data;
};

// Delete review
export const deleteReview = async (reviewId) => {
  const res = await api.delete(`/reviews/${reviewId}`);
  return res.data;
};