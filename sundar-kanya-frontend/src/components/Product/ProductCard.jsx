import "./ProductCard.css";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

function ProductCard({ product }) {

  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const { user } = useAuth();

  const { toggle, isWishlisted } = useWishlist();

const handleWishlist = (e) => {
  e.stopPropagation();

  toggle(product._id);
};

 const handleCart = async (e) => {
  e.stopPropagation();

  await addToCart(product._id, 1);
};

  return (

    <div
      className="pc-card"
      onClick={() =>
        navigate(`/products/${product._id}`)
      }
    >

      <button
        className="pc-wishlist-btn"
        onClick={handleWishlist}
      >

        {isWishlisted(product._id)
          ? <FaHeart />
          : <FiHeart />}

      </button>

      <div className="pc-image">

        <img
          src={
            product.images?.length
              ? product.images[0]
              : "/placeholder.jpg"
          }
          alt={product.name}
        />

      </div>

      <div className="pc-content">

        <span className="pc-category">

          {product.category.charAt(0).toUpperCase() +
            product.category.slice(1)}

        </span>

        <h3 className="pc-title">

          {product.name}

        </h3>

        <div className="pc-rating">

          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

        </div>

        <h4 className="pc-price">

          ₹{product.price}

        </h4>

        <button
          className="pc-cart-btn"
          onClick={handleCart}
        >

          Add To Cart

        </button>

      </div>

    </div>

  );

}

export default ProductCard;