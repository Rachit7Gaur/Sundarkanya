import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import sendEmail from "../config/sendEmail.js";
import orderConfirmationEmail from "../utils/orderConfirmationEmail.js";
import orderCancelledEmail from "../utils/orderCancelledEmail.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      user: req.user.id,

      items: cart.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images[0] || "",
        quantity: item.quantity,
        price: item.product.price,
      })),

      shippingAddress,

      paymentMethod: paymentMethod || "COD",

      totalAmount,

      paymentStatus:
        paymentMethod === "COD"
          ? "Pending"
          : "Paid",

      orderStatus:
        paymentMethod === "COD"
          ? "Processing"
          : "Processing",
          });

    // Clear cart after placing order
    cart.items = [];
    await cart.save();

    // Get customer
const user = await User.findById(req.user.id);

// Send confirmation email
await sendEmail({
  email: user.email,
  subject: "🎉 Your Sundarkanya Order is Confirmed!",
  message: orderConfirmationEmail(order),
});

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
  console.log(error); // <-- Add this

  res.status(500).json({
    message: "Server error",
    error: error.message,
  });
}
};

// Get Logged-in User Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Admin - Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Admin - Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update Payment Status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.paymentStatus = paymentStatus;

    await order.save();

    res.json({
      message: "Payment status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // User can cancel only his own order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // Already cancelled
    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
      });
    }

    // Cannot cancel shipped/delivered
    if (
      order.orderStatus === "Shipped" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({
        message: "Order cannot be cancelled now",
      });
    }

    // 30-minute cancellation window
    const thirtyMinutes = 30 * 60 * 1000;

    if (Date.now() - order.createdAt.getTime() > thirtyMinutes) {
      return res.status(400).json({
        message: "Cancellation period expired",
      });
    }

    // Restore stock
    for (const item of order.items) {
      item.product.stock += item.quantity;
      await item.product.save();
    }

    order.orderStatus = "Cancelled";
    order.cancelledAt = new Date();

    if (order.paymentMethod !== "COD") {
      order.paymentStatus = "Refund Pending";
    }

    await order.save();

    const user = await User.findById(req.user.id);

await sendEmail({
  email: user.email,
  subject: "Your Order has been Cancelled",
  message: orderCancelledEmail(order),
});

    res.json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};