import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

import {
  getReviews,
  addReview,
} from "../../services/reviewService";

import "./ProductDetail.css";

import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import ProductGallery from "../../components/ProductDetails/ProductGallery";
import QuantitySelector from "../../components/ProductDetails/QuantitySelector";

import { getProductById } from "../../services/productService";
import { addToCart } from "../../services/cartService";

import formatCurrency from "../../utils/formatCurrency";
import stockStatus from "../../utils/stockStatus";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
  fetchProduct();
  fetchReviews();
}, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);

      setProduct(data);
    } catch (error) {
      toast.error(error.message || "Unable to load product");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
  try {
    const data = await getReviews(id);

    setReviews(data.reviews);
    setAverageRating(data.averageRating);
    setTotalReviews(data.totalReviews);
  } catch (error) {
    console.log(error);
  }
};

  const handleAddToCart = async () => {
  if (!user) {
    toast.error("Please login to add products to cart");
    navigate("/login");
    return;
  }

  try {
    await addToCart(product._id, quantity);
    toast.success("Product added to cart");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to add product"
    );
  }
};

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  const handleReviewSubmit = async (e) => {
  e.preventDefault();

  try {
    await addReview(id, {
      rating,
      comment,
    });

    toast.success("Review submitted");

    setRating(5);
    setComment("");

    fetchReviews();
    fetchProduct();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to submit review"
    );
  }
};

  if (loading) return <Loader />;

  if (!product) return <h2>Product not found.</h2>;

  const status = stockStatus(product.stock);

  return (
    <div className="product-details-page">

      <div className="container">

        <div className="row">

          <div className="col-lg-6">

          <ProductGallery
            images={product.images}
            productId={product._id}
          />

          </div>

          <div className="col-lg-6">

            <span className="category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <div className="rating-summary">
            ⭐ {Number(averageRating).toFixed(1)} / 5

            <span>
              ({totalReviews} Reviews)
            </span>
          </div>

            <h2 className="price">
              {formatCurrency(product.price)}
            </h2>

            <p
              style={{
                color: status.color,
                fontWeight: "600",
              }}
            >
              {status.text}
            </p>

            <p className="description">
              {product.description}
            </p>

            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              maxStock={product.stock}
            />

            <Button onClick={handleAddToCart}>
              Add To Cart
            </Button>

            <div style={{ marginTop: "15px" }}>

              <Button
                variant="secondary"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>

            </div>

          </div>

        </div>

      </div>
      <div className="reviews-section">

  <h2>Customer Reviews</h2>

  {reviews.length === 0 ? (
    <p>No reviews yet.</p>
  ) : (
    reviews.map((review) => (
      <div
        className="review-card"
        key={review._id}
      >
        <h4>{review.user?.name || "Anonymous User"}</h4>

        <p>{"⭐".repeat(review.rating)}</p>

        <p>{review.comment}</p>

        <small>
          {new Date(
            review.createdAt
          ).toLocaleDateString()}
        </small>
      </div>
    ))
  )}

  {!user && (
  <p className="login-review-msg">
    Please login to write a review.
  </p>
)}

  {user && (
    <form
      className="review-form"
      onSubmit={handleReviewSubmit}
    >
      <h3>Write a Review</h3>

      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
      >
        <option value={5}>★★★★★</option>
        <option value={4}>★★★★</option>
        <option value={3}>★★★</option>
        <option value={2}>★★</option>
        <option value={1}>★</option>
      </select>

      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        required
      />

      <button type="submit">
        Submit Review
      </button>
    </form>
  )}

</div>

    </div>
  );
};

export default ProductDetails;