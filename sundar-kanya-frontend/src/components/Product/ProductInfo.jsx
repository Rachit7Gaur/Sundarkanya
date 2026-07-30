import {
  FaStar,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";

import QuantitySelector from "../ProductDetails/QuantitySelector";

import "./ProductInfo.css";

function ProductInfo({
  product,
  averageRating,
  totalReviews,
  quantity,
  setQuantity,
  handleAddToCart,
  handleBuyNow,
}) {

  return (
    <div className="pi">

      <span className="pi-category">
        {product.category}
      </span>

      <h1 className="pi-title">
        {product.name}
      </h1>

      <div className="pi-rating">

        <FaStar className="star"/>

        <span>
          {averageRating.toFixed(1)}
        </span>

        <small>
          ({totalReviews} Reviews)
        </small>

      </div>

      <div className="pi-price">

        ₹{product.price}

      </div>

      <p className="pi-tax">
        Inclusive of all taxes
      </p>

      <div className="pi-offers">

        <h4>Available Offers</h4>

        <ul>

          <li>✨ Flat ₹300 OFF on first order</li>

          <li>🚚 Free Shipping across India</li>

          <li>💳 Secure Online Payment</li>

          <li>↩ Easy 7 Days Return</li>

        </ul>

      </div>

      <div className="pi-stock">

        {product.stock > 0 ? (
          <span className="stock-in">
            In Stock
          </span>
        ) : (
          <span className="stock-out">
            Out of Stock
          </span>
        )}

      </div>

      <div className="pi-quantity">

        <label>Quantity</label>

        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />

      </div>

      <div className="pi-buttons">

        <button
          className="wishlist-btn"
        >
          <FaHeart />
        </button>

        <button
          className="cart-btn"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>

      </div>

      <button
        className="buy-btn"
        onClick={handleBuyNow}
      >
        Buy Now
      </button>

      <div className="pi-services">

        <div>

          <FaTruck />

          <span>Free Shipping</span>

        </div>

        <div>

          <FaUndo />

          <span>Easy Returns</span>

        </div>

        <div>

          <FaShieldAlt />

          <span>Secure Payment</span>

        </div>

      </div>

    </div>
  );
}

export default ProductInfo;