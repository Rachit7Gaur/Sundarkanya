import express from "express";

import { protect, authorizeRoles } from "../middleware/auth.js";

import { getDashboardStats , getCustomers} from "../controllers/adminController.js";

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

export default router;