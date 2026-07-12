import express from "express";

import {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import {
  protect,
} from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/product/:productId", getProductReviews);

// Logged in users
router.post("/product/:productId", protect, addReview);

router.put("/:id", protect, updateReview);

router.delete("/:id", protect, deleteReview);

export default router;