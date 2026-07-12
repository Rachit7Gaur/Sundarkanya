import { useNavigate } from "react-router-dom";
import "./CartSummary.css";
import formatCurrency from "../../utils/formatCurrency";

const CartSummary = ({ items }) => {
  const navigate = useNavigate();

  const totalProducts = items.length;

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Products ({totalProducts})</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div className="summary-row">
        <span>Total Quantity</span>
        <span>{totalQuantity}</span>
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span>
          {shipping === 0
            ? "FREE"
            : formatCurrency(shipping)}
        </span>
      </div>

      <div className="summary-row">
        <span>Discount</span>
        <span>₹0</span>
      </div>

      <hr />

      <div className="summary-total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <div className="summary-features">
        <p>🔒 100% Secure Checkout</p>
        <p>🚚 Free Shipping</p>
        <p>↩ Easy Returns</p>
      </div>

      <button
        className="checkout-btn"
        onClick={() => navigate("/checkout")}
      >
        Proceed To Checkout
      </button>
    </div>
  );
};

export default CartSummary;