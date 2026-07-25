import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productService";
import ProductCard from "../../Product/ProductCard";
import "./FeaturedProducts.css";

function FeaturedCollection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="featured-section">

      <div className="section-title">
        <p>HANDPICKED FOR YOU</p>
        <h2>Featured Collection</h2>
      </div>

      <div className="featured-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}

export default FeaturedCollection;