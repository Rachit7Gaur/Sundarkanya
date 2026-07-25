import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getProducts,
  deleteProduct,
} from "../../services/productService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import "./ManageProducts.css";

function ManageProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      loadProducts();
    }, []);

    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {

  let data = [...products];

  if (search) {
    data = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category !== "All") {
    data = data.filter(
      (item) => item.category === category
    );
  }

  setFilteredProducts(data);

}, [search, category, products]);


  const handleDelete = async(id)=>{

if(!window.confirm("Delete this product?"))
return;

try{

await deleteProduct(id);

toast.success("Product deleted");

loadProducts();

}catch(error){

toast.error("Delete failed");

}

}

  return (

    <div className="manage-products">

      <div className="products-header">

        <div>

          <h1>Manage Products</h1>

          <p>
            Add, edit and manage all jewellery products.
          </p>

        </div>

        <Link
          to="/admin/products/add"
          className="add-product-btn"
        >
          <FaPlus />
          Add Product
        </Link>

      </div>

      <div className="products-toolbar">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          />
       <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        >

      <option value="All">All Categories</option>
      <option value="earrings">Earrings</option>
      <option value="pendant">Pendant</option>
      <option value="bracelet">Bracelet</option>

        </select>

      </div>

      <table className="products-table">

        <thead>

          <tr>

            <th>Image</th>

            <th>Name</th>

            <th>Category</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

       <tbody>

          {filteredProducts.map((product)=>(

          <tr key={product._id}>

          <td>

          <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
          />

          </td>

          <td>{product.name}</td>

          <td>{product.category}</td>

          <td>₹{product.price}</td>

          <td>{product.stock}</td>

          <td>

          <span
          className={`stock ${
          product.stock===0
          ? "out-stock"
          : product.stock<10
          ? "low-stock"
          : "in-stock"
          }`}
          >

          {product.stock===0
          ? "Out of Stock"
          : product.stock<10
          ? "Low Stock"
          : "In Stock"}

          </span>

          </td>

          <td>

          <button className="edit-btn" onClick={() => navigate(`/admin/products/edit/${product._id}`)}>
              <FaEdit/>
            </button>

          <button
          className="delete-btn"
          onClick={()=>handleDelete(product._id)}
          >

          <FaTrash/>

          </button>

          </td>

          </tr>

          ))}

       </tbody>

      </table>

    </div>

  );

}

export default ManageProducts;