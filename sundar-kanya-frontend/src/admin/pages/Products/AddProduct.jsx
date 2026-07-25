import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createProduct,
} from "../../services/productService";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
});

const [images, setImages] = useState([]);

const [previewImages, setPreviewImages] = useState([]);

const [loading, setLoading] =
useState(false);

const handleChange = (e) => {
  setProductData({
    ...productData,
    [e.target.name]: e.target.value,
  });
};

const handleImageChange = (e) => {

  const files = Array.from(e.target.files);

  setImages(files);

  const previews = files.map((file) =>
    URL.createObjectURL(file)
  );

  setPreviewImages(previews);

};

const removeImage = (index) => {

  const updatedImages = [...images];
  updatedImages.splice(index,1);
  setImages(updatedImages);

  const updatedPreview = [...previewImages];
  updatedPreview.splice(index,1);
  setPreviewImages(updatedPreview);

};

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const formData =
      new FormData();

    formData.append(
      "name",
      productData.name
    );

    formData.append(
      "description",
      productData.description
    );

    formData.append(
      "price",
      productData.price
    );

    formData.append(
      "stock",
      productData.stock
    );

    formData.append(
      "category",
      productData.category
    );

    images.forEach((image) => {
      formData.append(
        "images",
        image
      );
    });

    await createProduct(formData);

    toast.success(
      "Product added successfully"
    );

    navigate("/admin/products");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to add product"
    );

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="add-product">

      <div className="page-header">
        <div>
          <h1>Add New Product</h1>
          <p>Create a new jewellery product for your store.</p>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product Name"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product Description"
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Price"
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              placeholder="Stock"
            />
          </div>

        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="earrings">Earrings</option>
            <option value="pendant">Pendant</option>
            <option value="bracelet">Bracelet</option>
          </select>

        </div>

        <div className="form-group">

          <label>Product Images</label>

          <label className="upload-box">

            <div className="upload-content">

              <div className="upload-icon">📷</div>

              <h3>Drag & Drop Images</h3>

              <p>
                or click to browse
              </p>

              <small>
                PNG, JPG, JPEG (Maximum 5 Images)
              </small>

            </div>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

          </label>

        </div>

        <button
          type="submit"
          className="save-product-btn"
          disabled={loading}
          >

          {loading
          ? "Creating..."
          : "Create Product"}

          </button>

      </form>

    </div>
  );
}

export default AddProduct;