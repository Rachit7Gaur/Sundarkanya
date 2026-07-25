import { Link } from "react-router-dom";
import "./CategoryProductCard.css";

function CategoryProductCard({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="category-product-card"
    >
      <div className="category-product-image">

        <img
          src={
            product.images?.length
              ? product.images[0]
              : "https://via.placeholder.com/400"
          }
          alt={product.name}
        />

      </div>

      <div className="category-product-info">

        <h3>{product.name}</h3>

        <p>₹{product.price}</p>

      </div>

    </Link>
  );
}

export default CategoryProductCard;