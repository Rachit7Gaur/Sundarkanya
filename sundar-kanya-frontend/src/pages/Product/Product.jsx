import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  getProducts,
  getProductsByCategory,
} from "../../services/productService";

import ProductCard from "../../components/FeaturedProducts/ProductCard";
import "./Product.css";

const Products = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      let data;

      if (category) {
        data = await getProductsByCategory(category);
      } else {
        data = await getProducts();
      }

      setProducts(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  let filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (sort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "newest") {
    filteredProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (loading) {
    return <h2 className="loading">Loading Products...</h2>;
  }

  return (
    <div className="products-page">
      <h1 className="page-title">
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "Our Collection"}
      </h1>

      <div className="product-toolbar">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low-high">
            Price: Low to High
          </option>
          <option value="high-low">
            Price: High to Low
          </option>
          <option value="newest">
            Newest
          </option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <h2>No products found.</h2>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;