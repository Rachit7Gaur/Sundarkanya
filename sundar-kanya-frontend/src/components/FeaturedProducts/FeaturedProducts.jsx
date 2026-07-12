import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./FeaturedProducts.css";

import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
import { getProducts } from "../../services/productService";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      // Show only first 4 products
      setProducts(data.slice(0, 4));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load featured products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="featured">

      <div className="section-heading">
        <h2>Featured Products</h2>
        <p>Discover our most loved jewellery.</p>
      </div>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <div className="no-products">
            <h3>No featured products available.</h3>
            <p>Products added by the admin will appear here.</p>
          </div>
        )}
      </div>

    </section>
  );
}

export default FeaturedProducts;