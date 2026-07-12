const orderConfirmationEmail = (order) => {
  const items = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
        <td style="padding:8px;border:1px solid #ddd;">${item.quantity}</td>
        <td style="padding:8px;border:1px solid #ddd;">₹${item.price}</td>
      </tr>
    `
    )
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;background:#fff8fb;padding:30px;">
    <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #f2d6e2;">

      <div style="background:#d63384;color:white;padding:20px;text-align:center;">
        <h1 style="margin:0;">🌸 Sundarkanya</h1>
        <p style="margin:5px 0;">Order Confirmation</p>
      </div>

      <div style="padding:25px;">

        <h2>Hello ${order.shippingAddress.fullName},</h2>

        <p>
          Thank you for shopping with <strong>Sundarkanya</strong>.
          Your order has been confirmed successfully.
        </p>

        <h3>Order Details</h3>

        <p><strong>Order ID:</strong> ${order._id}</p>

        <p><strong>Payment:</strong> ${order.paymentStatus}</p>

        <p><strong>Total:</strong> ₹${order.totalAmount}</p>

        <table style="width:100%;border-collapse:collapse;margin-top:15px;">
          <thead>
            <tr style="background:#f8d7e5;">
              <th style="padding:10px;border:1px solid #ddd;">Product</th>
              <th style="padding:10px;border:1px solid #ddd;">Qty</th>
              <th style="padding:10px;border:1px solid #ddd;">Price</th>
            </tr>
          </thead>

          <tbody>
            ${items}
          </tbody>
        </table>

        <h3 style="margin-top:25px;">Shipping Address</h3>

        <p>
          ${order.shippingAddress.fullName}<br>
          ${order.shippingAddress.address}<br>
          ${order.shippingAddress.city},
          ${order.shippingAddress.state}<br>
          ${order.shippingAddress.pincode}<br>
          Phone: ${order.shippingAddress.phone}
        </p>

        <p style="margin-top:30px;">
          We will notify you once your order is shipped.
        </p>

      </div>

      <div style="background:#fafafa;padding:15px;text-align:center;color:#666;">
        © ${new Date().getFullYear()} Sundarkanya. All Rights Reserved.
      </div>

    </div>
  </div>
  `;
};

export default orderConfirmationEmail;