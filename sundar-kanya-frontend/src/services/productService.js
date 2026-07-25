import api from "./api";


// Get all products
export const getProducts = async () => {

  const response = await api.get("/products");

  return response.data;

};


// Get single product
export const getProductById = async (id) => {

  const response = await api.get(`/products/${id}`);

  return response.data;

};


// Get products by category
export const getProductsByCategory = async (category) => {

  const response = await api.get(`/products/category/${category}`);

  return response.data;

};


// Create Product (Admin)
export const createProduct = async (formData) => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update product
export const updateProduct = async (id, formData) => {
  const response = await api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
// Delete product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const { data } = await api.get(
    `/products/search?q=${query}`
  );
  return data;
};