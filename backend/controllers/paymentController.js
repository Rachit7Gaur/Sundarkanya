import Razorpay from "razorpay";
import crypto from "crypto";
import config from "../config/config.js";
import Order from "../models/Order.js"; 
import Cart from "../models/Cart.js";
import sendEmail from "../config/sendEmail.js";
import orderConfirmationEmail from "../utils/orderConfirmationEmail.js";
import User from "../models/User.js";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
export const createRazorpayOrder = async (req, res) => {
  try {


const cart = await Cart.findOne({
  user: req.user.id
}).populate("items.product");

if (!cart || cart.items.length === 0) {
  return res.status(400).json({
    message: "Cart is empty"
  });
}

const totalAmount = cart.items.reduce(
  (total, item) =>
    total + item.product.price * item.quantity,
  0
);

const options = {
  amount: totalAmount * 100,
  currency: "INR",
  receipt: `receipt_${Date.now()}`
};



  const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Verify Razorpay payment signature
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shippingAddress,
      paymentMethod,
    } = req.body;

    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", config.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    console.log("Signature verified");

    // Get user's cart
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }
    console.log("Cart:", cart);

    // Calculate total amount
    const totalAmount = cart.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );

    console.log("Total Amount:", totalAmount);
    
console.log("Checking stock...");

for (const item of cart.items) {
  console.log(
    item.product.name,
    "Stock:",
    item.product.stock,
    "Qty:",
    item.quantity
  );

  if (item.product.stock < item.quantity) {
    console.log("Stock check failed");

    return res.status(400).json({
      success: false,
      message: `${item.product.name} is out of stock`,
    });
  }
}

console.log("Stock check passed");



  // Check if payment already exists
const existingOrder = await Order.findOne({
  razorpayPaymentId: razorpay_payment_id,
});

if (existingOrder) {
  return res.json({
    success: true,
    message: "Payment already verified",
    order: existingOrder,
  });
}

console.log("Creating order...");

    // Create Order
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
      paymentMethod,
      totalAmount,

      paymentStatus: "Paid",
      orderStatus: "Processing",

      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    console.log("Order created:", order._id);
console.log("Reducing stock...");
   // Reduce product stock
for (const item of cart.items) {
  item.product.stock -= item.quantity;
  await item.product.save();
}
console.log("Clearing cart...");
    // Clear cart
    cart.items = [];
    await cart.save();
console.log("Sending success response...");

   // Get customer email
const user = await User.findById(req.user.id);

// Send response FIRST
res.json({
  success: true,
  message: "Payment successful",
  order,
});

// Send email in background
try {
  await sendEmail({
    email: user.email,
    subject: "🎉 Your Sundarkanya Order is Confirmed!",
    message: orderConfirmationEmail(order),
  });
  console.log("Order confirmation email sent");
} catch (err) {
  console.error("Order email failed:", err);
}

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};