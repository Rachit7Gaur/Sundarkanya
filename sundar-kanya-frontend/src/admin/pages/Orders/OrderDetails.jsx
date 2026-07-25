import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getOrderDetails,
  updateOrderStatus,
} from "../../services/adminService";

import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const data = await getOrderDetails(id);
      setOrder(data);
      setStatus(data.orderStatus);
    } catch (error) {
      toast.error("Failed to load order");
    }
  };

const handleUpdate = async () => {
  try {
    await updateOrderStatus(id, status);

    toast.success("Order updated successfully");

    navigate("/admin/orders");

  } catch (error) {
    toast.error("Update failed");
  }
};

  if (!order) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-order-details">

      <h1>Order Details</h1>

      <div className="order-card">

        <h3>Customer Information</h3>

        <p><strong>Name:</strong> {order.user?.name}</p>

        <p><strong>Email:</strong> {order.user?.email}</p>

        <hr />

        <h3>Shipping Address</h3>

        <p>{order.shippingAddress.fullName}</p>

        <p>{order.shippingAddress.phone}</p>

        <p>{order.shippingAddress.address}</p>

        <p>
          {order.shippingAddress.city},
          {" "}
          {order.shippingAddress.state}
        </p>

        <p>{order.shippingAddress.pincode}</p>

        <hr />

        <h3>Products</h3>

        {order.items.map((item) => (

          <div
            key={item._id}
            className="order-product"
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <div>

              <h4>{item.name}</h4>

              <p>Qty : {item.quantity}</p>

              <p>₹{item.price}</p>

            </div>

          </div>

        ))}

        <hr />

        <h3>Total Amount</h3>

        <p>₹{order.totalAmount}</p>

        <h3>Payment Status</h3>

        <p>{order.paymentStatus}</p>

        <h3>Order Status</h3>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option value="Pending">
            Pending
          </option>

          <option value="Processing">
            Processing
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>

        <button
          className="update-btn"
          onClick={handleUpdate}
        >
          Update Order
        </button>

      </div>

    </div>
  );
}

export default OrderDetails;