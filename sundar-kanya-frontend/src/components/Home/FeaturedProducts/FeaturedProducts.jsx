import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productService";
import ProductCard from "../../Product/ProductCard";
import "./FeaturedProducts.css";

function FeaturedCollection() {
  console.log("FeaturedCollection Rendered");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
  const data = await getProducts();

  console.log("Complete response:", data);
  console.log("Type:", typeof data);
  console.log("Is Array:", Array.isArray(data));
  console.log("Products property:", data?.products);

  if (Array.isArray(data)) {
    setProducts(data.slice(0, 8));
  } else if (Array.isArray(data?.products)) {
    setProducts(data.products.slice(0, 8));
  } else {
    setProducts([]);
  }
} catch (error) {
  console.error(error);
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