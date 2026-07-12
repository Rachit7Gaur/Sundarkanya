import express from "express";
import { protect } from "../middleware/auth.js";
import { addToCart, getCart, removeFromCart, clearCart ,updateCartQuantity } from "../controllers/cartController.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:productId", protect, removeFromCart);
router.delete("/", protect, clearCart);
router.put("/", protect , updateCartQuantity);

export default router;