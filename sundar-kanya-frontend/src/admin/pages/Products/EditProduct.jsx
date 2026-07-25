import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getProductById,
  updateProduct,
} from "../../services/productService";

import "./EditProduct.css";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [previewImages, setPreviewImages] = useState([]);

  const [images, setImages] = useState([]);
const [saving, setSaving] = useState(false);

  useEffect(() => {

    loadProduct();

  }, []);

  const loadProduct = async () => {

    try {

      const product = await getProductById(id);

      setProductData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
      });

      setPreviewImages(product.images);

    } catch (error) {

      toast.error("Failed to load product");

      navigate("/admin/products");

    } finally {

      setLoading(false);

    }

  };

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

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setSaving(true);

    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("category", productData.category);

    images.forEach((image) => {
      formData.append("images", image);
    });

    await updateProduct(id, formData);

    toast.success("Product updated successfully");

    navigate("/admin/products");

  } catch (error) {

  console.log(error.response?.data);

  toast.error(
    error.response?.data?.message ||
    error.message ||
    "Failed to update product"
  );

}finally {

    setSaving(false);

  }

};

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="edit-product">

      <div className="page-header">

        <div>

          <h1>Edit Product</h1>

          <p>Update product information.</p>

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
          />

        </div>

        <div className="form-group">

          <label>Description</label>

          <textarea
            rows="5"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>Price</label>

            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Stock</label>

            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
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
            <option value="earrings">Earrings</option>
            <option value="pendant">Pendant</option>
            <option value="bracelet">Bracelet</option>
          </select>

        </div>

        <div className="image-preview-container">

          {previewImages.map((image, index) => (

            <div
              key={index}
              className="preview-card"
            >

              <img
                src={image}
                alt="product"
              />

            </div>

          ))}

        </div>

        <div className="form-group">

          <label>Replace Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

        </div>

        <button
          type="submit"
          className="save-product-btn"
          disabled={saving}
        >

          {saving
            ? "Updating Product..."
            : "Update Product"}

        </button>
        
      </form>

    </div>

  );

}

export default EditProduct;