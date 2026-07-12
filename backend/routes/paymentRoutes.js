import express from "express";
import { protect } from "../middleware/auth.js";

import {
  createRazorpayOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// Create Razorpay Order
router.post("/create-order", protect, createRazorpayOrder);

// Verify Razorpay Payment
router.post("/verify", protect, verifyPayment);

export default router;