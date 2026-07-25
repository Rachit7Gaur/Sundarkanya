import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

import { useWishlist } from "../../context/WishlistContext";
import { addToCart } from "../../services/cartService";
import PageLayout from "../../components/Layout/PageLayout";

import "./Wishlist.css";

function Wishlist() {
  const { wishlist, toggle } = useWishlist();

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);

      toggle(productId);

      toast.success("Added to cart");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add to cart"
      );
    }
  };

  return (
    <PageLayout>
   
    <div className="wl-page">

      {/* Header */}

      <section className="wl-header">

        <p className="wl-breadcrumb">

          Home / Wishlist

        </p>

        <h1>

          My Wishlist

        </h1>

        <span>

          Save your favourite jewellery and purchase later.

        </span>

      </section>

      {wishlist.length === 0 ? (

        <section className="wl-empty">

          <div className="wl-empty-icon">

            ❤️

          </div>

          <h2>

            Your Wishlist is Empty

          </h2>

          <p>

            Discover beautiful handcrafted jewellery
            and save your favourites here.

          </p>

          <Link
            to="/products"
            className="wl-shop-btn"
          >

            Continue Shopping

          </Link>

        </section>

      ) : (

        <>

          <div className="wl-top">

            <h2>

              Saved Jewellery

            </h2>

            <span>

              {wishlist.length} Item
              {wishlist.length > 1 ? "s" : ""}

            </span>

          </div>

          <div className="wl-grid">

            {wishlist.map((product) => (

              <div
                key={product._id}
                className="wl-card"
              >

                <button
                  className="wl-remove"
                  onClick={() => toggle(product._id)}
                >

                  <FaHeart />

                </button>

                <Link
                  to={`/products/${product._id}`}
                  className="wl-image"
                >

                  <img
                    src={
                      product.images?.[0] ||
                      "https://via.placeholder.com/500"
                    }
                    alt={product.name}
                  />

                </Link>

                <div className="wl-content">

                  <span className="wl-category">

                    {product.category}

                  </span>

                  <Link
                    to={`/products/${product._id}`}
                    className="wl-title"
                  >

                    {product.name}

                  </Link>

                  <div className="wl-rating">

                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />

                    <span>

                      5.0

                    </span>

                  </div>

                  <p className="wl-price">

                    ₹{product.price}

                  </p>

                  <span
                    className={
                      product.stock > 0
                        ? "wl-stock in"
                        : "wl-stock out"
                    }
                  >

                    {product.stock > 0
                      ? "In Stock"
                      : "Out Of Stock"}

                  </span>

                  <div className="wl-actions">

                    <button
                      className="wl-cart-btn"
                      onClick={() =>
                        handleAddToCart(product._id)
                      }
                    >

                      <FiShoppingBag />

                      Add To Cart

                    </button>

                    <Link
                      to={`/products/${product._id}`}
                      className="wl-view-btn"
                    >

                      View Details

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </>

      )}

    </div>
    </PageLayout> 
  );
}

export default Wishlist;