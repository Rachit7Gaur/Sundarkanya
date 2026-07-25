import express from "express";

import { protect, authorizeRoles } from "../middleware/auth.js";

import {
  getDashboardStats,
  getCustomers,
  getCustomerById,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getAnalytics,
  getSubscribers,
  deleteSubscriber,
  getSettings,
updateSettings,
searchAdmin,
getNotifications
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

router.get(
  "/customers",
  protect,
  authorizeRoles("admin"),
  getCustomers
);

router.get(
  "/search",
  protect,
  authorizeRoles("admin"),
  searchAdmin
);

router.get(
  "/customers/:id",
  protect,
  authorizeRoles("admin"),
  getCustomerById
);

router.get(
  "/orders",
  protect,
  authorizeRoles("admin"),
  getAllOrders
);

router.get(
  "/orders/:id",
  protect,
  authorizeRoles("admin"),
  getOrderById
);

router.patch(
  "/orders/:id",
  protect,
  authorizeRoles("admin"),
  updateOrderStatus
);

router.get(
  "/analytics",
  protect,
  authorizeRoles("admin"),
  getAnalytics
);

router.get(
  "/newsletter",
  protect,
  authorizeRoles("admin"),
  getSubscribers
);

router.delete(
  "/newsletter/:id",
  protect,
  authorizeRoles("admin"),
  deleteSubscriber
);

router.get(
  "/settings",
  protect,
  authorizeRoles("admin"),
  getSettings
);

router.put(
  "/settings",
  protect,
  authorizeRoles("admin"),
  updateSettings
);

router.get("/notifications", protect, authorizeRoles("admin"), getNotifications);



export default router;