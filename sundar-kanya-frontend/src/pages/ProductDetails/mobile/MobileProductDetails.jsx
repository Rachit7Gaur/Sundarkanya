import "./MobileProductDetails.css";
 

import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

import QuantitySelector from "../../../components/ProductDetails/QuantitySelector";
import ProductAccordion from "../../../components/Product/ProductAccordion";
import TrustSection from "../../../components/Product/TrustSection";
import MobileReviewSection from "../../../components/Product/MobileReviewSection";
import RelatedProducts from "../../../components/Product/RelatedProducts";
import MobileProductGallery from "../../../components/ProductDetails/MobileProductGallery";

function MobileProductDetails({
  product,
  user,
  reviews,
  averageRating,
  totalReviews,

  quantity,
  setQuantity,

  handleAddToCart,
  handleBuyNow,

  rating,
  setRating,

  comment,
  setComment,

  handleReviewSubmit,

  relatedProducts,
}) {

  const navigate = useNavigate();

  const handleShare = async () => {

    try{

        if(navigator.share){

            await navigator.share({

                title: product.name,

                text: `Check out this beautiful jewellery from Sundar Kanya.`,

                url: window.location.href,

            });

        }else{

            await navigator.clipboard.writeText(window.location.href);

            toast.success("Product link copied");

        }

    }catch(error){

        console.log(error);

    }

};

  return (

    <div className="mp-page">


      {/* Gallery */}

      <div className="mp-gallery">

       <MobileProductGallery
    product={product}
    images={product.images}
    handleShare={handleShare}
/>
      </div>

      {/* Product Info */}

      <div className="mp-info">

        <span className="mp-category">

          {product.category}

        </span>

        <h1 className="mp-title">

          {product.name}

        </h1>

        <div className="mp-rating">

          ⭐ {averageRating.toFixed(1)}

          <span>

            ({totalReviews} Reviews)

          </span>

        </div>

        <div className="mp-price">

          ₹{product.price}

        </div>

        <div className="mp-stock">

          {product.stock > 0 ? (
            <span className="stock-available">
              ✔ In Stock
            </span>
          ) : (
            <span className="stock-out">
              Out of Stock
            </span>
          )}

        </div>

        <div className="mp-divider"></div>

        <div className="mp-quantity">

          <h3>Quantity</h3>

          <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              maxStock={product.stock}
          />

        </div>

        <TrustSection />

        <ProductAccordion product={product} />
        
        <MobileReviewSection
          user={user}
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          handleReviewSubmit={handleReviewSubmit}
        />

        <RelatedProducts relatedProducts={relatedProducts} />

        <div className="mp-sticky-bar">

        <div className="mp-sticky-price">

          <span className="mp-sticky-label">
            Price
          </span>

          <h3>₹{product.price}</h3>

        </div>

        <div className="mp-sticky-buttons">

          <button
            className="sticky-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <button
            className="sticky-buy-btn"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>

        </div>

      </div>

      </div>
      

    </div>

  );

}

export default MobileProductDetails;