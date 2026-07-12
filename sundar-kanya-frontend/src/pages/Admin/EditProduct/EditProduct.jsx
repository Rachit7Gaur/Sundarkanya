import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import "./EditProduct.css";

import {
  getProductById,
  updateProduct,
} from "../../../services/productService";

const EditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {

    try {

      const data = await getProductById(id);

      setProduct({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category,
        images: data.images,
      });

      setPreviews(data.images);

    } catch (error) {

      console.log(error);
      toast.error("Failed to load product");

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });

  };

  const handleImages = (e) => {

    const files = Array.from(e.target.files);

    setNewImages(files);

    const previewUrls = files.map(file =>
      URL.createObjectURL(file)
    );

    setPreviews(previewUrls);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      const formData = new FormData();

        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("category", product.category);

        newImages.forEach(file => {
          formData.append("images", file);
        });

      await updateProduct(id, formData);

      toast.success("Product updated successfully");

      navigate("/admin/products");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update product"
      );

    } finally {

      setSaving(false);

    }

  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (

    <div className="add-product-page">

      <div className="add-product-card">

        <h1>Edit Product</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="earrings">Earrings</option>
            <option value="pendant">Pendant</option>
            <option value="bracelet">Bracelet</option>
          </select>

          <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
            />

            <div className="image-preview">

              {previews.map((img, index) => (

                <img
                  key={index}
                  src={img}
                  alt="preview"
                />

              ))}

          </div>

          <button type="submit" disabled={saving}>
            {saving ? "Updating..." : "Update Product"}
          </button>

        </form>

      </div>

    </div>

  );

};

export default EditProduct;