import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import "./ProductCard.css";

function ProductCard({ product }) {
const { toggle, isWishlisted } = useWishlist();
const { user } = useAuth();

const handleWishlist = async () => {
  if (!user) {
    toast.error("Please login first");
    return;
  }

  await toggle(product._id);
};

  const {addToCart} = useContext(CartContext);

  return (
    <div className="product-card">

      <div className="product-image">

        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/300"
          }
          alt={product.name}
        />

        {product.stock > 0 && (
          <span className="product-badge">
            NEW
          </span>
        )}

        <button
            className={`wishlist-btn ${
              isWishlisted(product._id) ? "active" : ""
            }`}
            onClick={handleWishlist}
          >
            {isWishlisted(product._id) ? "❤️" : "🤍"}
          </button>

      </div>

      <div className="product-info">

        <h3>{product.name}</h3>

        <div className="rating">
          ⭐⭐⭐⭐⭐
        </div>

        <div className="price-box">
          <span className="price">
            ₹{product.price}
          </span>
        </div>

        <div className="product-buttons">

            <button
              className="cart-btn"
              onClick={() => addToCart(product._id)}
            >
              Add To Cart
            </button>

          <Link
            to={`/products/${product._id}`}
            className="product-view-btn"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;