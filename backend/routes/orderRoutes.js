import express from "express";
import { protect, authorizeRoles } from "../middleware/auth.js";

import {
  placeOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/", protect, getUserOrders);
router.get("/all", protect, authorizeRoles("admin"), getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);



router.put(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  updateOrderStatus
);

router.put(
  "/:id/payment",
  protect,
  authorizeRoles("admin"),
  updatePaymentStatus
);

export default router;