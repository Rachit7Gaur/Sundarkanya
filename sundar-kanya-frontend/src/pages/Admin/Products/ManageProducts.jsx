import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import "./ManageProducts.css";

import Loader from "../../../components/Loader/Loader";
import {
  getProducts,
  deleteProduct,
} from "../../../services/productService";

const ManageProducts = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const data = await getProducts();

      setProducts(data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load products");

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      toast.success("Product deleted");

      fetchProducts();

    } catch (error) {

      console.log(error);

      toast.error("Unable to delete product");

    }

  };

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="manage-products">

      <div className="top-bar">

        <h1>
          Manage Products
        </h1>

        <Link
          className="add-btn"
          to="/admin/products/add"
        >
          + Add Product
        </Link>

      </div>

      <table>

        <thead>

          <tr>

            <th>Image</th>

            <th>Name</th>

            <th>Category</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {
            products.map((product) => (

              <tr key={product._id}>

                <td>

                  <img
                    src={
                      product.images.length
                        ? product.images[0]
                        : "https://via.placeholder.com/70"
                    }
                    alt={product.name}
                  />

                </td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>{product.stock}</td>

                <td>

                  <div className="action-buttons">

                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );

};

export default ManageProducts;