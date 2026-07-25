import { Link, useParams } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const { id } = useParams();

  return (
    <div className="confirmation-page">

      <div className="confirmation-card">

        <div className="success-circle">
          ✓
        </div>

        <p className="confirmation-tag">
          ORDER CONFIRMED
        </p>

        <h1>
          Thank You for Your Purchase!
        </h1>

        <p className="confirmation-text">
          Your jewellery order has been placed successfully.
          Our artisans will carefully prepare your order and
          it will be shipped very soon.
        </p>

        <div className="order-info">

          <div className="info-box">
            <span>Order ID</span>
            <strong>{id}</strong>
          </div>

          <div className="info-box">
            <span>Payment</span>
            <strong>Confirmed ✓</strong>
          </div>

          <div className="info-box">
            <span>Delivery</span>
            <strong>3 - 5 Business Days</strong>
          </div>

        </div>

        <div className="order-note">
          <p>
            📦 You will receive order updates on your registered
            email and phone number.
          </p>
        </div>

<div className="confirmation-buttons">
  <Link
    to="/products"
    className="confirmation-shop-btn"
  >
    Continue Shopping
  </Link>

  <Link
    to="/profile"
    className="confirmation-orders-btn"
  >
    View My Orders
  </Link>
</div>

      </div>

    </div>
  );
};

export default OrderConfirmation;