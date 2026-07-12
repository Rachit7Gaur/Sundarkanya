const orderCancelledEmail = (order) => {
  return `
    <div style="font-family: Arial, sans-serif; padding:20px;">
      <h2 style="color:#d63384;">
        ❌ Your Order has been Cancelled
      </h2>

      <p>Hello <strong>${order.shippingAddress.fullName}</strong>,</p>

      <p>Your order has been cancelled successfully.</p>

      <hr>

      <p><strong>Order ID:</strong> ${order._id}</p>

      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>

      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>

      <p><strong>Order Status:</strong> ${order.orderStatus}</p>

      ${
        order.paymentMethod !== "COD"
          ? `
          <p style="color:green;">
            Your refund will be processed shortly.
          </p>
        `
          : ""
      }

      <hr>

      <p>
        Thank you for choosing
        <strong>Sundarkanya ❤️</strong>
      </p>
    </div>
  `;
};

export default orderCancelledEmail;