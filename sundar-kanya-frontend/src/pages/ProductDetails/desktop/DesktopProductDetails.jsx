import "./DesktopProductDetails.css";

import ProductGallery from "../../../components/ProductDetails/ProductGallery";
import ProductInfo from "../../../components/Product/ProductInfo";
import ReviewSection from "../../../components/Product/ReviewSection/ReviewSection";
import RelatedProducts from "../../../components/Product/RelatedProducts";
import ProductTabs from "../../../components/Product/ProductTabs";

function DesktopProductDetails({
  product,
  user,
  reviews,
  relatedProducts,
  quantity,
  setQuantity,
  averageRating,
  totalReviews,
  activeTab,
  setActiveTab,
  handleAddToCart,
  handleBuyNow,
  handleReviewSubmit,
  rating,
  setRating,
  comment,
  setComment,
}) {
  return (
    <div className="desktop-product-page">

      <section className="desktop-breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <strong>{product.name}</strong>
      </section>

      <section className="desktop-product-container">

        <div className="desktop-gallery">
          <ProductGallery
            images={product.images}
            productId={product._id}
          />
        </div>

        <div className="desktop-info">

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

      <ProductTabs product={product} />

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

      <RelatedProducts
        relatedProducts={relatedProducts}
      />

    </div>
  );
}

export default DesktopProductDetails;