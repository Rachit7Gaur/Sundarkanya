import Button from "../Button/Button";
import QuantitySelector from "../ProductDetails/QuantitySelector";
import formatCurrency from "../../utils/formatCurrency";
import stockStatus from "../../utils/stockStatus";
import ProductTabs from "./ProductTabs";

function ProductInfo({
  product,
  averageRating,
  totalReviews,
  quantity,
  setQuantity,
  activeTab,
  setActiveTab,
  handleAddToCart,
  handleBuyNow,
}) {
  const status = stockStatus(product.stock);

  return (
    <div className="pd-content">

  <span className="pd-category">
    {product.category.toUpperCase()}
  </span>

  <h1 className="pd-title">
    {product.name}
  </h1>

  <div className="pd-rating">
    ⭐ {Number(averageRating).toFixed(1)}
    <span>
      ({totalReviews} Reviews)
    </span>
  </div>

  <div className="pd-price-box">

    <h2 className="pd-price">
      {formatCurrency(product.price)}
    </h2>

    <span className="pd-tax">
      Inclusive of all taxes
    </span>

  </div>

  <div className="pd-highlights">

  <div className="pd-highlight">
    <span>✨</span>
    <p>Premium Finish</p>
  </div>

  <div className="pd-highlight">
    <span>💎</span>
    <p>Skin Friendly</p>
  </div>

  <div className="pd-highlight">
    <span>🚚</span>
    <p>Free Shipping</p>
  </div>

</div>

<div
  className="pd-stock"
  style={{ color: status.color }}
>
  {status.text}
</div>

<ProductTabs
  product={product}
  activeTab={activeTab}
  setActiveTab={setActiveTab}
/>

{/* Quantity */}

<div className="pd-quantity">

  <h4>Quantity</h4>

  <QuantitySelector
    quantity={quantity}
    setQuantity={setQuantity}
    maxStock={product.stock}
  />

</div>

{/* Buttons */}

<div className="pd-buttons">

  <Button
    className="pd-cart-btn"
    onClick={handleAddToCart}
  >
    Add To Bag
  </Button>

  <Button
    className="pd-buy-btn"
    variant="secondary"
    onClick={handleBuyNow}
  >
    Buy Now
  </Button>

</div>

{/* Services */}

<div className="pd-services">

  <div className="pd-service">

    <span>🚚</span>

    <div>

      <h4>Free Shipping</h4>

      <p>Above ₹999</p>

    </div>

  </div>

  <div className="pd-service">

    <span>🔒</span>

    <div>

      <h4>Secure Payment</h4>

      <p>100% Safe Checkout</p>

    </div>

  </div>

  <div className="pd-service">

    <span>↩️</span>

    <div>

      <h4>Easy Returns</h4>

      <p>7 Day Return</p>

    </div>

  </div>

  <div className="pd-service">

    <span>💎</span>

    <div>

      <h4>Premium Quality</h4>

      <p>Handcrafted Jewellery</p>

    </div>

  </div>

</div>

</div>
  );
}

export default ProductInfo;