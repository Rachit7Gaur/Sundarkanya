import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import {
  getOrders,
  cancelOrder,
} from "../../services/orderService";

import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

const handleCancelOrder = async (order) => {
  const result = await Swal.fire({
    imageUrl: "/logo.jpeg",
    imageWidth: 90,
    imageHeight: 90,

    title: "Cancel Order?",
    html: `
      <div style="text-align:left">
        <p><b>Order ID:</b> #${order._id.slice(-6)}</p>
        <p><b>Total:</b> ₹${order.totalAmount}</p>

        ${
          order.paymentMethod !== "COD"
            ? `
          <p style="color:#d63384">
            💳 Your refund will be processed after cancellation.
          </p>
        `
            : `
          <p style="color:#28a745">
            Cash on Delivery order will simply be cancelled.
          </p>
        `}

        <br>

        <span style="color:red;font-weight:bold">
          This action cannot be undone.
        </span>
      </div>
    `,

    background: "#fffafc",

    confirmButtonText: "Yes, Cancel Order",

    cancelButtonText: "Keep My Order",

    showCancelButton: true,

    confirmButtonColor: "#d63384",

    cancelButtonColor: "#6c757d",

    reverseButtons: true,

    showClass: {
      popup: "animate__animated animate__zoomIn"
    },

    hideClass: {
      popup: "animate__animated animate__zoomOut"
    }
  });

  if (!result.isConfirmed) return;

  try {

    const res = await cancelOrder(order._id);

    await Swal.fire({

      icon: "success",

      imageUrl: "/logo.jpeg",

      imageWidth: 80,

      title: "Order Cancelled",

      html: `
        <h3 style="color:#d63384">
          Your order has been cancelled successfully.
        </h3>

        ${
          order.paymentMethod !== "COD"
            ? "<p>Your refund will be processed shortly.</p>"
            : "<p>Thank you for shopping with Sundarkanya ❤️</p>"
        }

      `,

      confirmButtonColor: "#d63384",

      background: "#fffafc"
    });

    loadOrders();

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text:
        error.response?.data?.message ||
        "Unable to cancel order.",
      confirmButtonColor: "#d63384",
    });

  }
};

  if (loading) {
    return <h2 className="loading">Loading Orders...</h2>;
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No orders found</h2>

          <p>You haven't placed any orders yet.</p>

          <Link to="/products" className="shop-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <h3>Order #{order._id.slice(-6)}</h3>

                <span
                  className={`status ${order.orderStatus.toLowerCase()}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              {/* Ordered Products */}

              <div className="order-products">
                {order.items.map((item) => (
                  <div
                    className="order-product"
                    key={item._id}
                  >
                      <img
                        src={
                          item.product?.images?.[0] ||
                          item.image ||
                          "https://via.placeholder.com/90"
                        }
                        alt={item.name}
                      />

                      <div className="order-product-info">
                        <h4>{item.product?.name || item.name}</h4>

                        <p>₹{item.price}</p>

                        <p>Quantity: {item.quantity}</p>
                      </div>
                  </div>
                ))}
              </div>

              <div className="shipping-box">
                <h4>Shipping Address</h4>

                <p>{order.shippingAddress.fullName}</p>

                <p>{order.shippingAddress.phone}</p>

                <p>{order.shippingAddress.address}</p>

                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}
                </p>

                <p>{order.shippingAddress.pincode}</p>
              </div>

              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>

              <p>
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>Payment Status:</strong>{" "}
                {order.paymentStatus}
              </p>

              <div className="order-actions">
              <Link
                to={`/order-confirmation/${order._id}`}
                className="details-btn"
              >
                View Details
              </Link>

              {["Pending", "Processing"].includes(order.orderStatus) &&
                (Date.now() - new Date(order.createdAt).getTime()) <
                  30 * 60 * 1000 && (
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelOrder(order)}
                  >
                    Cancel Order
                  </button>
              )}
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;