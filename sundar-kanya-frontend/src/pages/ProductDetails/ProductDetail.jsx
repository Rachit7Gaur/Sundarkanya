import { useEffect, useState , useContext } from "react";
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
import ProductCard from "../../components/Product/ProductCard";
import ProductInfo from "../../components/Product/ProductInfo";
import ReviewSection from "../../components/Product/ReviewSection";
import RelatedProducts from "../../components/Product/RelatedProducts";

import {
  getProductById,
  getProducts,
} from "../../services/productService";
import { CartContext } from "../../context/CartContext";

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
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("description");

  const {addToCart} = useContext(CartContext);

  useEffect(() => {
  fetchProduct();
  fetchReviews();
}, [id]);

const fetchProduct = async () => {

  try {

    setLoading(true);

    const data = await getProductById(id);

    setProduct(data);

    const allProducts = await getProducts();

    const related = allProducts
      .filter(
        (item) =>
          item.category === data.category &&
          item._id !== data._id
      )
      .slice(0, 4);

    setRelatedProducts(related);

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
    <div className="pd-page">

    {/* Breadcrumb */}

    <section className="pd-breadcrumb">

      <span>Home</span>

      <span>/</span>

      <span>{product.category}</span>

      <span>/</span>

      <strong>{product.name}</strong>

    </section>

    {/* Product */}

    <section className="pd-container">

      {/* Gallery */}

      <div className="pd-gallery">

        <ProductGallery
          images={product.images}
          productId={product._id}
        />

      </div>

      {/* Content */}

      <div className="pd-content">

       <ProductInfo
          product={product}
          averageRating={averageRating}
          totalReviews={totalReviews}
          quantity={quantity}
          setQuantity={setQuantity}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleAddToCart={handleAddToCart}
          handleBuyNow={handleBuyNow}
        />


      </div>

    </section>

    {/* ================= Reviews ================= */}

        <ReviewSection
        user={user}
        reviews={reviews}
        totalReviews={totalReviews}
        averageRating={averageRating}
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        handleReviewSubmit={handleReviewSubmit}
      />

{/* =========================
    RELATED PRODUCTS
========================= */}

<RelatedProducts
    relatedProducts={relatedProducts}
/>

</div>
</div>

);

};

export default ProductDetails;