import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  searchProducts
} from "../controllers/productController.js";

import { protect, authorizeRoles } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public Routes
router.get("/", getProducts);
router.get("/search", searchProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);

// Admin Routes
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.array("images", 5),
  createProduct
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  upload.array("images", 5),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteProduct
);

export default router;