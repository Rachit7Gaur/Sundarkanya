import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useWishlist } from "../../context/WishlistContext";
import { addToCart } from "../../services/cartService";

import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, toggle } = useWishlist();

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      toast.success("Added to cart");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add to cart"
      );
    }
  };

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h2>Your wishlist is empty</h2>

          <p>Save your favourite jewellery here.</p>

          <Link
            to="/products"
            className="shop-btn"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div
              className="wishlist-card"
              key={product._id}
            >
              <img
                src={
                  product.images?.length
                    ? product.images[0]
                    : "https://via.placeholder.com/300"
                }
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p className="price">
                ₹{product.price}
              </p>

              <div className="wishlist-actions">
                <button
                  className="cart-btn"
                  onClick={() =>
                    handleAddToCart(product._id)
                  }
                >
                  Add To Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() =>
                    toggle(product._id)
                  }
                >
                  Remove
                </button>
              </div>

              <Link
                to={`/products/${product._id}`}
                className="details-btn"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;