import express from "express";

import {
  sendMessage,
  getMessages,
  deleteMessage,
  markAsRead,
} from "../controllers/contactController.js";

import { protect, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/", 
  sendMessage
);

router.get(
  "/", 
  protect, 
  authorizeRoles("admin"), 
  getMessages
);

router.put(
  "/:id/read",
  protect,
  authorizeRoles("admin"),
  markAsRead
);

router.delete(
  "/:id", 
  protect, 
  authorizeRoles("admin"), 
  deleteMessage
);



export default router;