import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";

import {
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../../../services/orderService";

import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const changeOrderStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, orderStatus: status }
            : order
        )
      );

      toast.success("Order status updated");
    } catch (error) {
      toast.error("Unable to update order");
    }
  };

  const changePaymentStatus = async (id, status) => {
    try {
      await updatePaymentStatus(id, status);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, paymentStatus: status }
            : order
        )
      );

      toast.success("Payment status updated");
    } catch (error) {
      toast.error("Unable to update payment");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-orders">

      <h1>Manage Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>

            <div className="order-header">
              <div>
                <h2>Order #{order._id.slice(-6)}</h2>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <h2>₹{order.totalAmount}</h2>
              </div>
            </div>

            <hr />

            <div className="customer-section">
              <h3>Customer Details</h3>

              <p>
                <strong>Name:</strong>{" "}
                {order.user?.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {order.user?.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.shippingAddress?.phone}
              </p>
            </div>

            <div className="address-section">
              <h3>Shipping Address</h3>

              <p>{order.shippingAddress?.fullName}</p>

              <p>{order.shippingAddress?.address}</p>

              <p>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
              </p>

              <p>{order.shippingAddress?.pincode}</p>
            </div>

            <div className="products-section">

              <h3>Ordered Products</h3>

              {order.items.map((item) => (
                <div
                  className="product-row"
                  key={item._id}
                >
                  <img
                    src={
                      item.product?.images?.[0] ||
                      item.image ||
                      "https://via.placeholder.com/80"
                    }
                    alt={
                      item.product?.name ||
                      item.name
                    }
                  />

                  <div className="product-info">

                    <h4>
                      {item.product?.name ||
                        item.name ||
                        "Product Deleted"}
                    </h4>

                    <p>
                      Quantity : {item.quantity}
                    </p>

                    <p>
                      Price : ₹{item.price}
                    </p>

                  </div>
                </div>
              ))}

            </div>

            <div className="payment-section">

              <p>
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod}
              </p>

              <div>

                <label>Order Status</label>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    changeOrderStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>

              </div>

              <div>

                <label>Payment Status</label>

                <select
                  value={order.paymentStatus}
                  onChange={(e) =>
                    changePaymentStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Failed</option>
                </select>

              </div>

            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default Orders;